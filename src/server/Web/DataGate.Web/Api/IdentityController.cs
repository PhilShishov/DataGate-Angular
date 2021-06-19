using DataGate.Common;
using DataGate.Common.Exceptions;
using DataGate.Common.Settings;
using DataGate.Data.Models.Users;
using DataGate.Services.Data.Users;
using DataGate.Services.Messaging;
using DataGate.Web.Api.Base;
using DataGate.Web.Helpers.TokenUtility.Contracts;
using DataGate.Web.Infrastructure.Attributes.Validation;
using DataGate.Web.Resources;
using DataGate.Web.ViewModels.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    public class UserLoginDto
    {
        [Required(ErrorMessage = ValidationMessages.FieldRequired)]
        public string Username { get; set; }

        [Required(ErrorMessage = ValidationMessages.FieldRequired)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }

        //[GoogleReCaptchaValidation]
        public string RecaptchaValue { get; set; }
    }

    public class ForgotPasswordDto
    {
        [Required(ErrorMessage = ValidationMessages.FieldRequired)]
        [EmailAddress]
        public string Email { get; set; }
    }

    public class ResetPasswordDto
    {
        [Required(ErrorMessage = ValidationMessages.FieldRequired)]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = ValidationMessages.FieldRequired)]
        [StringLength(ModelConstants.PasswordMaxLength, MinimumLength = ModelConstants.PasswordMinLength)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    [AllowAnonymous]
    public class IdentityController : ApiControllerBase
    {
        private const string UserPanelUrl = "/userpanel";
        private const string LoginPageRoute = "/login";

        private readonly UserManager<ApplicationUser> userManager;
        private readonly SharedLocalizationService sharedLocalizer;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ILogger<IdentityController> logger;
        private readonly IEmailSender emailSender;
        private readonly IJWTTokenGenerator jwtService;
        private readonly IConfiguration configuration;

        public IdentityController(
            SignInManager<ApplicationUser> signInManager,
            ILogger<IdentityController> logger,
            UserManager<ApplicationUser> userManager,
            SharedLocalizationService sharedLocalizer,
            IEmailSender emailSender, 
            IJWTTokenGenerator jwtService, 
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.sharedLocalizer = sharedLocalizer;
            this.signInManager = signInManager;
            this.logger = logger;
            this.emailSender = emailSender;
            this.jwtService = jwtService;
            this.configuration = configuration;
        }

        [HttpGet("getGoogleRecaptchaKey")]
        public async Task<ActionResult<string>> Get()
        {
            var key = this.configuration.GetValue<string>($"{AppSettingsSections.GoogleReCaptchaSection}:{GoogleReCaptchaOptions.Key}");
            return Ok(key);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserViewModel>> Login([FromBody]UserLoginDto userLoginDto)
        {
            UserViewModel userViewModel = new UserViewModel();
            if (this.ModelState.IsValid)
            {
                Microsoft.AspNetCore.Identity.SignInResult result = await this.signInManager
                    .PasswordSignInAsync(userLoginDto.Username, userLoginDto.Password, userLoginDto.RememberMe, lockoutOnFailure: true);
                var user = await this.userManager.FindByNameAsync(userLoginDto.Username);

                if (result.Succeeded)
                {
                    userViewModel.Username = user.UserName;
                    userViewModel.Roles = await this.userManager.GetRolesAsync(user);
                    userViewModel.TokenInfo.AuthToken = jwtService.GenerateAccessToken(user);
                    if (await this.userManager.IsEmailConfirmedAsync(user) == false)
                    {
                        userViewModel.ErrorMessage = this.sharedLocalizer.GetHtmlString(ErrorMessages.EmailNotConfirmed);
                        //this.ModelState.AddModelError(string.Empty, ErrorMessages.EmailNotConfirmed);
                        userViewModel.RedirectUrl = "/admin/confirm-email";
                    }

                    this.logger.LogInformation("User logged in.");

                    user.LastLoginTime = DateTimeOffset.UtcNow;
                    var lastLoginResult = await this.userManager.UpdateAsync(user);

                    if (!lastLoginResult.Succeeded)
                    {
                        throw new InvalidOperationException($"Unexpected error occurred setting the last login date" +
                            $" ({lastLoginResult.ToString()}) for user with ID '{user.Id}'.");
                    }
                    userViewModel.RedirectUrl = UserPanelUrl;
                    return userViewModel;
                }

                if (result.RequiresTwoFactor)
                {
                    userViewModel.RedirectUrl =  "/admin/LoginWith2fa";   // TODO
                }

                if (result.IsLockedOut)
                {
                    userViewModel.ErrorMessage = this.sharedLocalizer.GetHtmlString(ErrorMessages.AccountLocked);
                    this.logger.LogWarning(ErrorMessages.AccountLocked);
                }
                else
                {
                    userViewModel.ErrorMessage = this.sharedLocalizer.GetHtmlString(ErrorMessages.InvalidLoginAttempt);
                }
            }
            return Ok(userViewModel);
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult<bool>> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            if (this.ModelState.IsValid)
            {
                var user = await this.userManager.FindByEmailAsync(forgotPasswordDto.Email);
                if (user == null || !(await this.userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return Ok();
                }
                
                string code = await this.userManager.GeneratePasswordResetTokenAsync(user);
                string callbackUrl = $"{this.Request.Scheme}:localhost:4300/admin/reset-password?code={code}";
                string message = string.Format(GlobalConstants.PasswordResetMessage, HtmlEncoder.Default.Encode(callbackUrl));
                await this.emailSender.SendEmailAsync(
                    "philip.shishov@pharusmanco.lu",
                    "Pharus Management Lux S.A.",
                    forgotPasswordDto.Email,
                    GlobalConstants.ResetPasswordEmailSubject,
                    message);
            }
            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<string>> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            if (!this.ModelState.IsValid)
            {
                return Ok(null);
            }

            ApplicationUser user = await this.userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return Ok(LoginPageRoute);
            }
            IdentityResult result = await this.userManager.ResetPasswordAsync(user, resetPasswordDto.Code, resetPasswordDto.Password);
            if (result.Succeeded)
            {
                return Ok(LoginPageRoute);
            }

            foreach (IdentityError error in result.Errors)
            {
                this.ModelState.AddModelError(string.Empty, error.Description);
            }

            return Ok(null);
        }

        [HttpPost("renewtoken")]
        public async Task<ActionResult<string>> RenewToken([FromBody] string token)
        {
            try
            {
                string authToken = await Task.FromResult<string>(jwtService.RenewAccessToken(token));
                return Ok(authToken);
            }
            catch (NotAllowRenewTokenException)
            {
                return Unauthorized();
            }
        }
    }
}
