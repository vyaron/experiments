using Nancy;
using Nancy.Conventions;
using Nancy.TinyIoc;

namespace Service.Website.Website.Configuration
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, Nancy.Bootstrapper.IPipelines pipelines)
        {
            // Add a view location convention that looks for views in a folder
            //  named "views" next to the module class
            //
            this.Conventions.ViewLocationConventions.Add((viewName, model, context) => $"Website/Modules/{context.ModuleName}/views/{viewName}");

            // Add a new path for static content so our typescript files located in
            //  the 'App' folder can be served to SystemJS
            //
            this.Conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("App"));
        }
    }
}
