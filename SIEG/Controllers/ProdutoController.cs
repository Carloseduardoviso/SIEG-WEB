using Microsoft.AspNetCore.Mvc;

namespace SIEG.Controllers
{
    public class ProdutoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Criar()
        {
            return View();
        }
        public IActionResult Editar()
        {
            return View();
        }       
    }
}
