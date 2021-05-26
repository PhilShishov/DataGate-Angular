namespace DataGate.Web.Api
{
    using DataGate.Data.Models.Dtos;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using System.Collections.Generic;

    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<List<string>> Login([FromBody] UserLoginDto userLoginDto)
        {
            var countries = new List<string>();
            countries.Add("Italy");
            countries.Add("Luxembourg");
            countries.Add("Bulgaria");
            return Ok(countries);
        }
    }
}
