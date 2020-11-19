namespace DataGate.Web.Controllers
{
    using System;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using DataGate.Common;
    using DataGate.Data.Models.Users;
    using DataGate.Web.Dtos.Users;
    using DataGate.Web.Helpers.TokenUtility.Contracts;
    using DataGate.Web.InputModels.Users;
    using DataGate.Web.ViewModels.Tokens.Contracts;
    using Microsoft.AspNetCore.Authentication;

    [Route("api/[controller]")]
    [Consumes("application/json")]
    [ApiController]
    public class IdentityController : BaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        private IJWTTokenGenerator jWTTokenGenerator;
        private IJwtTokenValidation jwtSecrets;

        public IdentityController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IJWTTokenGenerator jWTTokenGenerator,
            IJwtTokenValidation jwtSecrets)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.jWTTokenGenerator = jWTTokenGenerator;
            this.jwtSecrets = jwtSecrets;
        }

        // GET api/<IdentityController>
        [HttpGet("signin")]
        public async Task<IActionResult> SignIn()
        {
            if (!this.signInManager.IsSignedIn(this.User))
            {
                // Clear the existing external cookie to ensure a clean login process
                await this.HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);                
            }

            return this.Ok();
        }

        // POST api/<IdentityController>
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInInputModel inputModel, string returnUrl = null)
        {
            returnUrl = returnUrl ?? this.Url.Content("~/");

            if (!ModelState.IsValid)
            {
                return this.BadRequest("Invalid username or password.");
            }

            var signInResult = await signInManager.PasswordSignInAsync(inputModel.Username, inputModel.Password, false, false);
            var user = await this.userManager.FindByNameAsync(inputModel.Username);

            if (!signInResult.Succeeded)
            {
                return this.BadRequest("Invalid username or password.");
            }

            if (user == null)
            {
                return this.NotFound("Unable to load user for update last login.");
            }

            user.LastLoginTime = DateTimeOffset.UtcNow;
            var lastLoginResult = await this.userManager.UpdateAsync(user);

            if (!lastLoginResult.Succeeded)
            {
                throw new InvalidOperationException($"Unexpected error occurred setting the last login date" +
                    $" ({lastLoginResult.ToString()}) for user with ID '{user.Id}'.");
            }

            if (await this.userManager.IsEmailConfirmedAsync(user) == false)
            {
                this.ModelState.AddModelError(string.Empty, ErrorMessages.EmailNotConfirmed);
                return this.BadRequest(ErrorMessages.EmailNotConfirmed);
            }

            var claims = new Claim[]
            {
                new Claim("username", inputModel.Username)
            };
            var accessToken = await jWTTokenGenerator.GenerateAccessToken(claims, jwtSecrets.UserTokenKey, DateTime.Now.AddDays(1));
            var token = new TokenDto
            {
                AccessToken = accessToken
            };

            return this.Ok(token);
        }
    }
}
