using System.Data.Entity;

namespace SIEG.Models
{
    public class CadastroContext: DbContext
    {
        public CadastroContext() : base("Cadastro")
        {
        }

        public DbSet<ClienteModel> Clientes { get; set; }
    }
}
