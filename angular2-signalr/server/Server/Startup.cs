using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Hosting;
using Owin;

namespace Server
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // This server will be accessed by clients from other domains, so
            //  we open up CORS
            //
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            // Build up the WebAPI middleware
            //
            var httpConfig = new HttpConfiguration();

            httpConfig.MapHttpAttributeRoutes();

            app.UseWebApi(httpConfig);
        }

    }
}
