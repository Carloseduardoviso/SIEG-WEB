namespace WEB.Helpers
{
    public static class AnonimizacaoHelper
    {
        public static string AnonimizarMatricula(string? matricula)
        {
            if (string.IsNullOrEmpty(matricula))
                return string.Empty;

            var posicaoUltimosDigitos = matricula.Length - 3;
            var matriculaAnonimizada = $"*******{matricula.Substring(posicaoUltimosDigitos, 3)}";
            return matriculaAnonimizada;
        }
    }
}
