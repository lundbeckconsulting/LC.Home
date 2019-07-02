using LC.Assets.Core.Components.Extensions;
using LC.Home.Blitz.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LC.Home.Blitz
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            this.Configuration = configuration;
            this.Environment = environment;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<LCContext>(opt => opt.UseSqlServer(this.Configuration.GetConnectionString("Default")));
            services.AddTransient<IDataRepo, DataRepo>();

            services.AddLCAssetsSlugify();
            services.AddLCAssetsConfig();
			services.AddLCAssetsDBContext();
            services.AddLCAssetsAndLocalization();
        }

        public void Configure(IApplicationBuilder app)
        {
            //app.UseLCAssetsHTTPS(this.Environment);
            app.UseLCAssetsDebug(this.Environment);
            app.UseLCAssetsLocalizationFromConfig();
            app.UseLCAssetsSlugify();
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }
    }
}
