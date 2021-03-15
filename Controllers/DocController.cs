/*
    @Date			: 26.02.2021
    @Author         : Stein Lundbeck
*/

using LC.Assets.Core;
using LC.Creator.Home.Butter.Models;
using LundbeckConsulting.Components.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace LC.Creator.Home.Butter.Controllers
{
    public class DocController : Controller
    {
        [Route(CoreStatics.BaseRoute + "/{base?}/{section?}")]
        public IActionResult Index([FromRoute(Name = "base")] string bse, [FromRoute(Name = "section")] string section)
        {
            IDocShow mod = new DocShow();

            if (!bse.Null() && !section.Null())
            {
                string name = section.ToTitleCase();

                switch(section)
                {
                    case "color":
                        name = "Color Profile";
                        break;

                    case "paddingmargin":
                        name = "Padding and Margin";
                        break;

                    case "formcontrol":
                        name = "Form Control";
                        break;
                }

                mod = new DocShow(bse, name, section);
            }

            return View(mod);
        }
    }
}
