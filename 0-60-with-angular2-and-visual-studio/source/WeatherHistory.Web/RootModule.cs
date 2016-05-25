using Nancy;

namespace WeatherHistory.Web
{
    public class RootModule : NancyModule
    {
        public RootModule()
        {
            Get["/"] = _ => View["index"];
        }
    }
}