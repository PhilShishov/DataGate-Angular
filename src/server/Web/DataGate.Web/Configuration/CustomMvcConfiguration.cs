using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DataGate.Web.Configuration
{
    public static class CustomMvcConfiguration
    {
        public static IServiceCollection AddCustomMvc(this IServiceCollection services)
           => services
               .AddControllers()
               .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))
               .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
               .SetCompatibilityVersion(CompatibilityVersion.Latest)
               .Services;
    }
}
