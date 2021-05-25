namespace DataGate.Data.Models.Tokens
{
    using DataGate.Web.ViewModels.Tokens.Contracts;

    public class JwtTokenValidation : IJwtTokenValidation
    {
        public string UserTokenKey { get; set; }
    }
}
