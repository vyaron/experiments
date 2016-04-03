using System;

namespace Service
{
    /// <summary>
    /// The class that provides the actions to perform when starting/stopping the service.
    /// </summary>
    public class ServiceHost
    {
        public ServiceHost()
        {
            Console.WriteLine("ServiceHost constructed");
        }

        public void Start()
        {
            Console.WriteLine("ServiceHost started");
        }

        public void Shutdown()
        {
            Console.WriteLine("ServiceHost shutting down");
        }

        public void Stop()
        {
            Console.WriteLine("ServiceHost stopped");
        }
    }
}
