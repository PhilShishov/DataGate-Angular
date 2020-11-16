namespace DataGate.Web.Helpers.TokenUtility.Contracts
{
    using System;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public interface IJWTTokenGenerator
    {
        Task<string> GenerateAccessToken(Claim[] claims, string secretKey, DateTime dateTime);
    }
}
