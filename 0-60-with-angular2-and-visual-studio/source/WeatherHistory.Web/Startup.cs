using Owin;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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
                // This object is what we use to configure the behavior
                //  of WebAPI in our application
                //
                var httpConfiguration = new HttpConfiguration();

                // We'll use attribute based routing instead of the 
                //  convention-based approach
                //
                httpConfiguration.MapHttpAttributeRoutes();

                // Change the serialization so it does camelCase
                //
                var jsonFormatter = httpConfiguration.Formatters.JsonFormatter;
                var settings = jsonFormatter.SerializerSettings;
                settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

                // Now add in web api to the OWIN pipeline
                //
                api.UseWebApi(httpConfiguration);
            });
        }
    }
}