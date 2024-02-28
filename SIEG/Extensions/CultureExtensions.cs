using Microsoft.AspNetCore.Localization;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;

namespace WEB.Extensions
{
    [ExcludeFromCodeCoverage]
    public static class CultureExtensions
    {
        public static IApplicationBuilder UseBrazilianCulture(this IApplicationBuilder app)
        {
            const string ptbr = "pt-BR";
            var supportedCultures = new[] { new CultureInfo(ptbr) };

            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(culture: ptbr, uiCulture: ptbr),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures
            });

            return app;
        }
    }
}
