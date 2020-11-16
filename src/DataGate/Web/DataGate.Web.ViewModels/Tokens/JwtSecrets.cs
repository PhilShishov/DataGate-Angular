namespace DataGate.Web.ViewModels.Tokens
{
    using DataGate.Web.ViewModels.Tokens.Contracts;

    public class JwtSecrets : IJwtSecrets
    {
        public string UserTokenKey { get; set; }
    }
}
