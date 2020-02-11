/*
    @Date			: 29.01.2020
    @Author         : Stein Lundbeck
*/

using LC.Assets.Core.Components;
using LC.Assets.Core.Components.Extensions;
using LC.Home.Chicken.Middle;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LC.Home.Chicken
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;

            this.Configuration.GetValue<string>("Chicken:Culture");
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<IConfiguration>(this.Configuration);
            services.AddAssetsIdentity();
            services.AddAssetsRepos(new string[] { RepoServiceTypes.Identity });
            services.AddAssetsHTTPS();
            services.AddAssets(end => {
                end.EnableEndpointRouting = false;
            }, true);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRewriter(
                new RewriteOptions()
                .Add(new CultureRedirect()));

            app.UseAssetsDebug(env);
            app.UseAssetsHTTPS();
            app.UseAssetsLocalization();
            app.UseMiddleware<SetCulture>();
            app.UseAssets(default, true);
        }

        public IConfiguration Configuration { get; }
    }
}
