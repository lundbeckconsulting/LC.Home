using Microsoft.AspNetCore.Mvc;


namespace LC.Home.Blitz
{
    public class Home : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }
        public IActionResult Project()
        {
            return View();
        }
    }
}
