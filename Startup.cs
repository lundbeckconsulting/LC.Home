/*
    @Date			: 29.01.2020
    @Author         : Stein Lundbeck
*/

using LC.Assets.Core.Components;
using LC.Assets.Core.Components.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LC.Home.Chips
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<IConfiguration>(this.Configuration);
            services.AddAssetsIdentity();
            services.AddAssetsRepos(new string[] { RepoServiceTypes.Identity });
            services.AddAssets(end => {
                end.EnableEndpointRouting = false;
            }, true);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseAssetsLocalizationLangQuery();
            //app.UseAssetsHTTPS(this.Configuration);
            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseAssetsDebug(env);
            app.UseAssets(default, true);
        }

        public IConfiguration Configuration { get; }
    }
}
