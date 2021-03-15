/*
    @Date			: 24.02.2021
    @Author         : Stein Lundbeck
*/

using LC.Assets.Core.Components.ApplicationFeatures;
using LC.Assets.Core.Components.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LC.Creator.Home.Butter
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAssetsSites(this.Configuration, default, new DefaultRoute("Creator", "Index"), new SSL());            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseAssetsSites(this.Configuration, new DefaultRoute("Creator", "Index"), new SSL());
        }

        public IConfiguration Configuration { get; }
    }
}
