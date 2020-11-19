namespace DataGate.Web.Controllers
{
    using System;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using DataGate.Common;
    using DataGate.Data.Models.Users;
    using DataGate.Web.Dtos.Users;
    using DataGate.Web.Helpers.TokenUtility.Contracts;
    using DataGate.Web.InputModels.Users;
    using DataGate.Web.ViewModels.Tokens.Contracts;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [Consumes("application/json")]
    [ApiController]
    public class IdentityController : BaseController
    {
        private SignInManager<ApplicationUser> signInManager;
        private UserManager<ApplicationUser> userManager;
        private IJWTTokenGenerator jWTTokenGenerator;
        private IJwtSecrets jwtSecrets;

        public IdentityController(SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IJWTTokenGenerator jWTTokenGenerator,
            IJwtSecrets jwtSecrets)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.jWTTokenGenerator = jWTTokenGenerator;
            this.jwtSecrets = jwtSecrets;
        }

        // POST api/<IdentityController>
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInInputModel inputModel)
        {
            var signInResult = await signInManager.PasswordSignInAsync(inputModel.Username, inputModel.Password, false, false);
         
            if (!signInResult.Succeeded)
            {
                return BadRequest("Invalid username or password.");
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

            return Ok(token);
        }
    }
}
