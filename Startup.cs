using Assets.Core.Components.Extensions;
using LC.Home.Blitz.Data;
using LC.Home.Blitz.Middle;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LC.Home.Blitz
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            this.Configuration = configuration;
            this.Environment = environment;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<LCContext>(opt => opt.UseSqlServer(this.Configuration.GetConnectionString("Default")));
            services.AddTransient<IDataRepo, DataRepo>();

            services.AddAssetsSlugify();
            services.AddAssetsConfig();
            services.AddAssetsDBContext();
            services.AddAssets(opt => {
                opt.EnableEndpointRouting = false;
            }, true);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseAssetsDebug(this.Environment);
            app.UseAssetsLocalization();
            app.UseMiddleware<SetCulture>();
            app.UseAssetsSlugify();
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }
    }
}
