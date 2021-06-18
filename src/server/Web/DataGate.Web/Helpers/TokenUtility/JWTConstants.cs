using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataGate.Web.Helpers.TokenUtility
{
    public static class JWTConstants
    {
        private const string kSECRET_KEY = "mySuperSecretKeyForTokens_``DataGate.,.";
        public static readonly SymmetricSecurityKey SigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(kSECRET_KEY));
        public const string Issuer = "DataGateApi";
        public static int ValidHoursFor = 3;
        public static TimeSpan ValidHoursExpiredFor = TimeSpan.FromHours(2);
    }
}
