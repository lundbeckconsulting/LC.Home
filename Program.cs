/*
    @Date			: 29.01.2020
    @Author         : Stein Lundbeck
*/

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace LC.Home.Chips
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
