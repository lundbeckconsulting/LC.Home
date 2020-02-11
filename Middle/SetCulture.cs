using LC.Assets.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Globalization;
using System.Threading.Tasks;

namespace LC.Home.Chicken.Middle
{
    public class SetCulture
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;

        public SetCulture(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _config = config;
        }
        public async Task Invoke(HttpContext context)
        {
            CultureInfo cult = new CultureInfo(context.Request.Query.ContainsKey("lang") ? context.Request.Query["lang"].ToString() : AssetsStatics.LocalizationDefaultCultureString);
            CultureInfo.CurrentCulture = cult;
            CultureInfo.CurrentUICulture = cult;

            await _next.Invoke(context);
        }
    }
}
