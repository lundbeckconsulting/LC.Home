/*
    @Date			: 29.01.2020
    @Author         : Stein Lundbeck
*/

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LC.Home.Chicken.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
