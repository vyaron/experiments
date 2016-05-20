using System;
using System.Collections.Generic;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Deserializers;
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
        public async Task<IHttpActionResult> Get(string zipCode)
        {
            // Now we can make our first API call to map the zip code
            //  to the geo coordinates we need
            //
            var zipCodeResponse = await RequestGeoFromZipcode(zipCode);

            // To start, just return a list of dummy results to show the API 
            //  endpoint is working
            //
            var today = DateTime.Now;

            // Now our dummy data will actually use the latitude and longitude 
            //  retrieved from the zip code API
            //
            var temps = new List<HistoricalTemperature>
            {
                new HistoricalTemperature {Date = today, Latitude = zipCodeResponse.Latitude, Longitude = zipCodeResponse.Longitude, High = 85, Low = 55},
                new HistoricalTemperature {Date = today.AddYears(-1), Latitude = zipCodeResponse.Latitude, Longitude = zipCodeResponse.Longitude, High = 85, Low = 55},
                new HistoricalTemperature {Date = today.AddYears(-2), Latitude = zipCodeResponse.Latitude, Longitude = zipCodeResponse.Longitude, High = 85, Low = 55},
                new HistoricalTemperature {Date = today.AddYears(-3), Latitude = zipCodeResponse.Latitude, Longitude = zipCodeResponse.Longitude, High = 85, Low = 55},
                new HistoricalTemperature {Date = today.AddYears(-4), Latitude = zipCodeResponse.Latitude, Longitude = zipCodeResponse.Longitude, High = 85, Low = 55}
            };

            // There's no real error condition here so just return the 200
            //  response with our List automatically serialized for the caller
            //
            return Ok(temps);
        }

        private async Task<ZipCodeApiResponse> RequestGeoFromZipcode(string zipcode)
        {
            // Create a RestSharp client we can use to make the API call
            //
            var client = new RestClient("https://www.zipcodeapi.com");

            // Now build up a request that matches what this API is expecting. We include
            //  out authentication token and the zipcode right in the URI, and that's simple
            //  to do with RestSharp's url segments
            //
            var request = new RestRequest("/rest/{apiKey}/info.json/{zipcode}/degrees", Method.GET);
            request.AddUrlSegment("apiKey", ConfigurationManager.AppSettings["zip-code-api-key"]);
            request.AddUrlSegment("zipcode", zipcode);

            // Now any HTTP call will be asynchronous, but this is trivial to handle with
            //  the async/await functionality available in .NET
            //
            var response = await client.ExecuteTaskAsync(request);

            // Finally, we need to "decode" the JSON data returned so we can load it
            //  into our internal object.
            //
            var content = JObject.Parse(response.Content);

            // Just populate a new object using the key's that existed in the JSON
            //  data returned
            //
            var zipCodeResponse = new ZipCodeApiResponse
            {
                Zipcode = Convert.ToString(content["zip_code"]),
                Latitude = Convert.ToDouble(content["lat"]),
                Longitude = Convert.ToDouble(content["lng"]),
                City = Convert.ToString(content["city"]),
                State = Convert.ToString(content["state"])
            };

            return zipCodeResponse;
        }
    }
}