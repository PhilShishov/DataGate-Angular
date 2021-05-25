using DataGate.Data.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<List<string>> Login([FromBody]UserLoginDto userLoginDto)
        {
            var countries = new List<string>();
            countries.Add("India");
            countries.Add("Bulgaria");
            return Ok(countries);
        }


    }
}
