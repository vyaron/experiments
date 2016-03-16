using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Owin.Hosting;

namespace Server
{
    public class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:9123/";

            // Start OWIN host 
            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine($"Server is running on {baseAddress}");
                Console.WriteLine("Press <enter> to stop server");
                Console.ReadLine();
            }


        }
    }
}
