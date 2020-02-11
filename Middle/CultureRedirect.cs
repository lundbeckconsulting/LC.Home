using LC.Assets.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Net.Http.Headers;
using System.Net;

namespace LC.Home.Chips.Middle
{
    public class CultureRedirect : IRule
    {
        public void ApplyRule(RewriteContext context)
        {
            HttpRequest req = context.HttpContext.Request;

            if (req.Path == "/" && !req.Query.ContainsKey("lang"))
            {
                HttpResponse res = context.HttpContext.Response;

                res.StatusCode = StatusCodes.Status301MovedPermanently;
                context.Result = RuleResult.EndResponse;
                res.Headers[HeaderNames.Location] = $"/?lang={AssetsStatics.LocalizationDefaultCultureString}";
            }
            else
            {
                return;
            }
        }
    }
}
