using System;
using System.Web.Http;

namespace Service.Website.Api
{
    [RoutePrefix("time")]
    public class TimeController : ApiController
    {

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(DateTimeOffset.Now);
        }
    }
}
