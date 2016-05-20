using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeatherHistory.Web.Models
{
    public class ZipCodeApiResponse
    {
        public string Zipcode { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public string City { get; set; }

        public string State { get; set; }
    }
}