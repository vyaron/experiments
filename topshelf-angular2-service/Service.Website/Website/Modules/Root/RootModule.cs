using Nancy;

namespace Service.Website.Website.Modules.Root
{
    public class RootModule : NancyModule
    {
        public RootModule()
        {
            // Define a single route that returns our index.html view
            //
            Get["/"] = _ => View["index"];
        }
    }
}
