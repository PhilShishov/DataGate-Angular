namespace DataGate.Web.Configuration
{
    using System.Text;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    using DataGate.Web.ViewModels.Tokens;
    using DataGate.Web.ViewModels.Tokens.Contracts;

    public static class ApiConfiguration
    {
        public static IServiceCollection AddApi(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();
            services.AddJWTService(configuration);

            return services;
        }

        private static void AddJWTService(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSection = configuration.GetSection(nameof(JwtSecrets));
            services.Configure<JwtSecrets>(jwtSection);
            services.AddSingleton<IJwtSecrets>(secrets => secrets.GetRequiredService<IOptions<JwtSecrets>>().Value);
            var jwtSecrets = jwtSection.Get<JwtSecrets>();
            var key = Encoding.ASCII.GetBytes(jwtSecrets.UserTokenKey);

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(auth =>
            {
                auth.RequireHttpsMetadata = false;
                auth.SaveToken = false;
                auth.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireSignedTokens = true,
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                };
            });
        }
    }
}
