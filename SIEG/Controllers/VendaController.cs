using Microsoft.AspNetCore.Mvc;

namespace SIEG.Controllers
{
    public class VendaController: Controller
    {
        public IActionResult Vendas()
        {
            return View();
        }
    }
}
