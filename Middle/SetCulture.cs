using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Globalization;

namespace LC.Home.Blitz.Middle
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
            CultureInfo cult = new CultureInfo(_config["Culture"]);

            CultureInfo.CurrentCulture = cult;
            CultureInfo.CurrentUICulture = cult;

            await _next.Invoke(context);
        }
    }
}
