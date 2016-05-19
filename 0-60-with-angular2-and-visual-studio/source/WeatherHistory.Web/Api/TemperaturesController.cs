using System;
using System.Collections.Generic;
using System.Web.Http;
using WeatherHistory.Web.Models;

namespace WeatherHistory.Web.Api
{
    // We derive our API contoller from the base class provided by WebAPI, but
    //  we also specify the route prefix at the controller level
    //
    [RoutePrefix("temperatures")]
    public class TemperaturesController : ApiController
    {
        // Now we can use the WebAPI conventions to automatically mark this as 
        //  a GET endpoint, and indicate that it does not add anything to the
        //  route
        //
        [Route("")]
        public IHttpActionResult Get(int zipCode)
        {
            // To start, just return a list of dummy results to show the API 
            //  endpoint is working
            //
            var today = DateTime.Now;

            var temps = new List<HistoricalTemperature>
            {
                new HistoricalTemperature {Date = today, Latitude = 44.9513057, Longitude = -93.0916494, High = 85, Low = 55},
                new HistoricalTemperature {Date = today.AddYears(-1), Latitude = 44.9513057, Longitude = -93.0916494, High = 85, Low = 55},
                new HistoricalTemperature {Date = today.AddYears(-2), Latitude = 44.9513057, Longitude = -93.0916494, High = 85, Low = 55},
                new HistoricalTemperature {Date = today.AddYears(-3), Latitude = 44.9513057, Longitude = -93.0916494, High = 85, Low = 55},
                new HistoricalTemperature {Date = today.AddYears(-4), Latitude = 44.9513057, Longitude = -93.0916494, High = 85, Low = 55}
            };

            // There's no real error condition here so just return the 200
            //  response with our List automatically serialized for the caller
            //
            return Ok(temps);
        }
    }
}