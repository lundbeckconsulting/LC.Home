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
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<LCContext>(opt => opt.UseSqlServer(this.Configuration.GetConnectionString("Default")));
            services.AddTransient<IDataRepo, DataRepo>();

            services.AddLCAssetsConfig();
			services.AddLCAssetsDBContext();			
			services.AddLCAssets();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
			app.UseLCAssetsDebug(env);
            app.UseLCAssetsHTTPS();
            app.UseLCAssets();
        }

        public IConfiguration Configuration { get; }
    }
}
