using Microsoft.AspNetCore.Mvc;

namespace SIEG.Controllers
{
    public class EstoqueController: Controller
    {
        public IActionResult EntradaDeProduto()
        {
            return View();
        }
        public IActionResult SaidaDeProduto()
        {
            return View();
        }
        public IActionResult MovimentacaoDeEstoque()
        {
            return View();
        }

    }
}
