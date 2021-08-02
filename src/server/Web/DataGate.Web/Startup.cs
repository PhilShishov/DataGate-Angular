// Copyright (c) DataGate Project. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

namespace DataGate.Web
{
    using System.Reflection;

    using DataGate.Common;
    using DataGate.Data;
    using DataGate.Services.Mapping;
    using DataGate.Web.Configuration;
    using DataGate.Web.InputModels.Funds;
    using DataGate.Web.ViewModels;
    using Microsoft.AspNetCore.Antiforgery;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration,IHostEnvironment env)
        {
            this.configuration = configuration;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            this.configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // ---------------------------------------------------------
            //
            // Database Connection settings
            services.AddDbContext<UsersDbContext>(options => 
                     options.UseSqlServer(this.configuration.GetConnectionString(GlobalConstants.DataGateUsersConnection)));

            services.AddDbContext<ApplicationDbContext>(options => 
                     options.UseSqlServer(this.configuration.GetConnectionString(GlobalConstants.DataGateAppConnection)));

            services.ConfigureIdentity()
                .ConfigureSession()
                .ConfigureDataProtection(this.configuration)
                .ConfigureCache()
                .ConfigureLocalization()
                .ConfigureCookies()
                .ConfigureSettings(this.configuration)
                .ConfigureForms()
                .ConfigureAntiForgery()
                //.ConfigureRouting()
                .ConfigureAuthorization()
                .AddRepositories()
                .AddEmailSendingService(this.configuration)
                .AddBusinessLogicServices()
                .AddApi(this.configuration)
                .AddJWTService(this.configuration);
            //services.AddApplicationInsightsTelemetry();
            services.AddSignalR();
            services.AddDatabaseDeveloperPageExceptionFilter();
            services.AddSwaggerDocument();
            services.AddCustomMvc();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
        {
            AutoMapperConfig.RegisterMappings(
                typeof(ErrorViewModel).GetTypeInfo().Assembly,
                typeof(EditFundInputModel).GetTypeInfo().Assembly);

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
                app.UseHsts();
            }

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404)
                {
                    context.Request.Path = "/error";
                    await next();
                }
                if (context.Request.Path == "/")
                {
                    //send the request token as a JavaScript-readable cookie, and Angular will use it by default
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions { HttpOnly = false });
                }
            });

            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseResponseCompression();
            app.UseResponseCaching();
            app.UseHttpsRedirection();
            app.UserLocalization();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseSession();
            app.UseRouting();
            app.UseCors(GlobalConstants.CorsPolicy);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(
                endpoints =>
                {
                    endpoints.MapControllers();
                });
        }
    }
}
