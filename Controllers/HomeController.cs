using Microsoft.AspNetCore.Mvc;


namespace LC.Home.Blitz.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult OmLundbeckConsulting()
        {
            return View();
        }

        public IActionResult MineProsjekter()
        {
            return View();
        }

        public IActionResult MinModell()
        {
            return View();
        }
    }
}
