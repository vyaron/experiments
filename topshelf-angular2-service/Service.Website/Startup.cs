using System.Web.Http;
using Nancy;
using Nancy.Owin;
using Owin;

namespace Service.Website
{
    class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        //
        public void Configuration(IAppBuilder appBuilder)
        {
            // We're going to hang the web API off off the /api "sub"-url so that we
            //  leave the root url open for the Angular 2 website.
            //
            appBuilder.Map("/api", api =>
            {
                // Create our config object we'll use to configure the API
                //
                var config = new HttpConfiguration();

                // Use attribute routing
                //
                config.MapHttpAttributeRoutes();

                // Now add in the WebAPI middleware
                //
                api.UseWebApi(config);
            });

            // Add Nancy to the OWIN pipeline.
            //  Note, because this is registered last we don't need to worry 
            //  about falling-through to any other middleware. Any requests to
            //  /api/... will be handled by WebAPI first, and anything else
            //  will fall through to Nancy
            //
            appBuilder.UseNancy();
        }
    }
}

