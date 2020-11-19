namespace DataGate.Web.Helpers.TokenUtility
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.IdentityModel.Tokens;
    using DataGate.Web.Helpers.TokenUtility.Contracts;

    internal class JWTTokenGenerator : IJWTTokenGenerator
    {
        private JwtSecurityTokenHandler tokenHandler;
        private SecurityTokenDescriptor tokenDescriptor;

        public JWTTokenGenerator()
        {
            tokenHandler = new JwtSecurityTokenHandler();
        }

        public async Task<string> GenerateAccessToken(Claim[] claims, string secretKey, DateTime dateTime)
        {
            var key = Encoding.ASCII.GetBytes(secretKey);

            var result = await Task.Run(() =>
            {
                tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = dateTime,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                string tokenResult = tokenHandler.WriteToken(token);
                return tokenResult;
            });

            return result;
        }
    }
}
