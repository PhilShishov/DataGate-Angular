// Copyright (c) DataGate Project. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

namespace DataGate.Web.Helpers.TokenUtility
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using DataGate.Common.Exceptions;
    using DataGate.Common.Settings;
    using DataGate.Data.Models.Users;
    using DataGate.Web.Helpers.TokenUtility.Contracts;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    internal class JWTTokenGenerator : IJWTTokenGenerator
    {
        //private JwtSecurityTokenHandler tokenHandler;
        //private SecurityTokenDescriptor tokenDescriptor;
        private JwtOptions jwtOptions;
        public JWTTokenGenerator(IOptions<JwtOptions> options)
        {
            //tokenHandler = new JwtSecurityTokenHandler();
            jwtOptions = options.Value;
        }

        //public async Task<string> GenerateAccessToken(Claim[] claims)
        //{
        //    var result = await Task.Run(() =>
        //    {
        //        tokenDescriptor = new SecurityTokenDescriptor
        //        {
        //            Subject = new ClaimsIdentity(claims),
        //            Expires = DateTime.Now.AddHours(JWTConstants.ValidHoursFor),
        //            SigningCredentials = new SigningCredentials(JWTConstants.SigningKey, SecurityAlgorithms.HmacSha256)
        //        };
        //        var token = tokenHandler.CreateToken(tokenDescriptor);
        //        string tokenResult = tokenHandler.WriteToken(token);
        //        return tokenResult;
        //    });

        //    return result;
        //}

        public string GenerateAccessToken(ApplicationUser userInfo)
        {
            var claims = GenerateClaims(userInfo);
            return GenerateToken(claims);   
        }

        public string RenewAccessToken(string token)
        {
            JwtSecurityToken decodedJwt = DecodedJwt(token);
            if (DateTime.UtcNow > decodedJwt.ValidTo.Add(TimeSpan.FromHours(2)))
            {
                throw new NotAllowRenewTokenException();
            }
            return GenerateToken(decodedJwt.Claims);
        }

        private List<Claim> GenerateClaims(ApplicationUser userInfo)
        {
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            return claims;
        }
        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(jwtOptions.Issuer,
             jwtOptions.Issuer,
             claims,
             expires: DateTime.Now.AddHours(3),
             signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private JwtSecurityToken DecodedJwt(string token)
            => new JwtSecurityTokenHandler().ReadJwtToken(token);
    }
}
