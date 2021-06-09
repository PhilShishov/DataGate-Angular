namespace DataGate.Web.Api
{
    using DataGate.Common;
    using DataGate.Data.Models.Users;
    using DataGate.Services.Messaging;
    using DataGate.Web.Resources;
    using DataGate.Web.ViewModels.Users;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Text.Encodings.Web;
    using System.Threading.Tasks;

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

    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private const string UserPanelUrl = "/userpanel";
        private const string LoginPageRoute = "/login";

        private readonly UserManager<ApplicationUser> userManager;
        private readonly SharedLocalizationService sharedLocalizer;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ILogger<IdentityController> logger;
        private readonly IEmailSender emailSender;

        public IdentityController(
            SignInManager<ApplicationUser> signInManager,
            ILogger<IdentityController> logger,
            UserManager<ApplicationUser> userManager,
            SharedLocalizationService sharedLocalizer,
            IEmailSender emailSender)
        {
            this.userManager = userManager;
            this.sharedLocalizer = sharedLocalizer;
            this.signInManager = signInManager;
            this.logger = logger;
            this.emailSender = emailSender;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserViewModel>> Login([FromBody] UserLoginDto userLoginDto)
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
                    if (await this.userManager.IsEmailConfirmedAsync(user) == false)
                    {
                        userViewModel.ErrorMessage = this.sharedLocalizer.GetHtmlString(ErrorMessages.EmailNotConfirmed);
                        //this.ModelState.AddModelError(string.Empty, ErrorMessages.EmailNotConfirmed);
                        userViewModel.RedirectUrl = "confirm-email";
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
                    userViewModel.RedirectUrl = "/LoginWith2fa";   // TODO
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

        [AllowAnonymous]
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
                string callbackUrl = $"{this.Request.Scheme}:localhost:4300/reset-password?code={code}";
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

        [AllowAnonymous]
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
    }
}
