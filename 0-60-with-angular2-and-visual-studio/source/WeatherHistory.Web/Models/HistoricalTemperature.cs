using System;

namespace WeatherHistory.Web.Models
{
    public class HistoricalTemperature
    {
        public DateTime Date { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public double Low { get; set; }

        public double High { get; set; }
    }
}