using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Server.Api
{
    [RoutePrefix("tasks")]
    public class TaskController : ApiController
    {

        public TaskController()
        {
            
        }


        [Route("long")]
        [HttpGet]
        public IHttpActionResult GetLongTask()
        {
            foreach (var i in Enumerable.Range(0, 10))
            {
                // Report back the status...

                Thread.Sleep(500);
            }

            return Ok("Long task complete");
        }


        [Route("short")]

        public IHttpActionResult GetShortTask()
        {
            foreach (var i in Enumerable.Range(0, 5))
            {
                // Report back the status...

                Thread.Sleep(500);
            }

            return Ok("Short task complete");
        }

    }
}
