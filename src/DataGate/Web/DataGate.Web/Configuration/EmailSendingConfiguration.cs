﻿namespace DataGate.Web.Configuration
{
    using DataGate.Common;
    using DataGate.Common.Settings;
    using DataGate.Services.Messaging;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class EmailSendingConfiguration
    {
        public static IServiceCollection AddEmailSendingService(this IServiceCollection services, IConfiguration configuration)
        {
            var sendGridOptions = configuration
                .GetSection(AppSettingsSections.SendGridSection)
                .Get<SendGridOptions>();

            services.AddTransient<IEmailSender>(x => new SendGridEmailSender(sendGridOptions.ApiKey));

            return services;
        }
    }
}
