using Owin;
using System.Web.Http;

namespace WeatherHistory.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var httpConfiguration = new HttpConfiguration();

            // We'll use attribute based routing instead of the 
            //  convention-based approach
            //
            httpConfiguration.MapHttpAttributeRoutes();

            // Now add in web api to the OWIN pipeline
            //
            appBuilder.UseWebApi(httpConfiguration);
        }
    }
}