using System;
using System.Collections.Generic;
using System.Text;

namespace DataGate.Data.Models.Dtos
{
    public class UserLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
        public string RecaptchaValue { get; set; }
    }
}
