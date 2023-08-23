namespace SIEG.Models
{
	public class ProdutoModel
	{
		public int IdProduto { get; set; }
		public string? Nome { get; set; }
		public int EstoqueInicial { get; set; }
		public int EstoqueMinimo { get; set; }
		public int EstoqueAtual { get; set; }
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
