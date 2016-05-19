using Owin;
using System.Web.Http;

namespace WeatherHistory.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            // Host all the WebAPI components underneath a path so we can
            //  easily deploy a traditional site at the root of the web
            //  application
            //
            appBuilder.Map("/api", api =>
            {
                var httpConfiguration = new HttpConfiguration();

                // We'll use attribute based routing instead of the 
                //  convention-based approach
                //
                httpConfiguration.MapHttpAttributeRoutes();

                // Now add in web api to the OWIN pipeline
                //
                api.UseWebApi(httpConfiguration);
            });
        }
    }
}