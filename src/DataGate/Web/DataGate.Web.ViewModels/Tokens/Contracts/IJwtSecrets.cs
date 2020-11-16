namespace DataGate.Web.ViewModels.Tokens.Contracts
{
    public interface IJwtSecrets
    {
        string UserTokenKey { get; set; }
    }
}
