using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace XSockets.GeoTests
{
    using Geo;
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void SendGeoJSON()
        {
            var client = new XSockets.XSocketClient("ws://localhost:4502", "http://localhost", "GeoBase");
            var geoController = (GeoBaseController) client.Controller("GeoBase");
            geoController.OnOpen += (s, e) =>
            {
            };
        }
        
    }
}
