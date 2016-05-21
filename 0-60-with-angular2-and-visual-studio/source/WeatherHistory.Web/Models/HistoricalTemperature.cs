using System;

namespace WeatherHistory.Web.Models
{
    public class HistoricalTemperature
    {
        public DateTime Date { get; set; }

        public float Latitude { get; set; }

        public float Longitude { get; set; }

        public float Low { get; set; }

        public float High { get; set; }
    }
}