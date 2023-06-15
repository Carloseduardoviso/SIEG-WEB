using Microsoft.AspNetCore.Mvc;

namespace SIEG.Controllers
{
    public class EstoqueController: Controller
    {
        public IActionResult EstoqueDeProduto()
        {
            return View();
        }
    }
}
