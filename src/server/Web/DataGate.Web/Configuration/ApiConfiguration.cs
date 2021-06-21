namespace DataGate.Web.Configuration
{
    using System.Text;

    using DataGate.Common;
    using DataGate.Common.Settings;
    using DataGate.Data.Models.Tokens;
    using DataGate.Web.ViewModels.Tokens.Contracts;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public static class ApiConfiguration
    {
        public static IServiceCollection AddApi(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddJWTService(configuration);
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy(GlobalConstants.CorsPolicy, builder =>
                {
                    builder.WithOrigins("http://localhost:4300").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                });
            });

            return services;
        }

        public static IServiceCollection AddJWTService(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSection = configuration.GetSection(AppSettingsSections.JwtSection);
            services.Configure<JwtOptions>(jwtSection);

            services.AddSingleton<IJwtTokenValidation>(secrets => secrets.GetRequiredService<IOptions<JwtTokenValidation>>().Value);

            var jwtOptions = jwtSection.Get<JwtOptions>();
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret));

            services
                .AddAuthentication(auth =>
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
                        IssuerSigningKey = signingKey,
                        ValidateIssuer = true,
                        ValidIssuer = jwtOptions.Issuer,
                        ValidateAudience = true,
                        ValidAudience = jwtOptions.Audience,
                        RequireSignedTokens = true,
                        RequireExpirationTime = true,
                        ValidateLifetime = true,
                    };
                });
            return services;
        }
    }
}
