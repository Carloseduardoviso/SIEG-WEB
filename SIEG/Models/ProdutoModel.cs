using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SIEG.Models
{
	public class ProdutoModel
	{
		public int IdProduto { get; set; }

        [Display(Name = "Produto")]
		public string? Nome { get; set; }

        [Display(Name = "Estoque Inicial")]
        public int EstoqueInicial { get; set; }

        [Display(Name = "Estoque Minimo")]
        public int EstoqueMinimo { get; set; }

        [Display(Name = "Estoque Atual")]
        public int EstoqueAtual { get; set; }

        [Display(Name = "Preço")]
        public decimal? Preco { get; set; }
		public bool Ativo { get; set; }

		public ProdutoModel()
		{

		}

		public ProdutoModel(int idProduto, string? nome, int estoqueInicial, int estoqueMinimo, int estoqueAtual, decimal? preco, bool ativo)
		{
			IdProduto = idProduto;
			Nome = nome;
			EstoqueInicial = estoqueInicial;
			EstoqueMinimo = estoqueMinimo;
			EstoqueAtual = estoqueAtual;
			Preco = preco;
			Ativo = ativo;
		}
	}
}
