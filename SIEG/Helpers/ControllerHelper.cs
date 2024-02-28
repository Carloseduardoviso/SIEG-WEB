namespace WEB.Helpers
{
    public static class ControllerHelper
    {
        public static string Nome(Type controller) => controller.Name.Replace("Controller", string.Empty);
    }
}
