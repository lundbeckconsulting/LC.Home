/*
    @Date			: 24.02.2021
    @Author         : Stein Lundbeck
*/

using Microsoft.AspNetCore.Mvc;

namespace LC.Creator.Home.Butter.Controllers
{
    public class CreatorController : Controller
    {
        public CreatorController()
        {
           
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
