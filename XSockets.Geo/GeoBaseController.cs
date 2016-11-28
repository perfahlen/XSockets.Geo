using XSockets.Core.XSocket;
using XSockets.Core.XSocket.Helpers;
using System.Threading.Tasks;
using XSockets.Core.Common.Socket.Attributes;
using GeoAPI.Geometries;
using NetTopologySuite.Features;
using System;
using NetTopologySuite.Geometries;

namespace XSockets.Geo
{
    public class GeoBaseController : XSocketController
    {
        [PersistentProperty]
        public IPolygon Fence { get; set; }

        [PersistentProperty]
        public string Channel { get; set; }

        [PersistentProperty]
        public IPoint Position { get; set; }

        [HttpPost]
        public virtual async Task OnGeoMessage(string geoJson)
        {
            var features = this.ParseGeometry(geoJson);
            await this.InvokeToAll(geoJson, "OnGeoMessage");
        }

        Geometry ParseGeometry(string geoJson)
        {
            var geoJsonreader = new NetTopologySuite.IO.GeoJsonReader();

            var geometry = geoJsonreader.Read<Geometry>(geoJson);

            return geometry;
        }

        Feature ParseFeatures(string geoJson)
        {
            var geoJsonreader = new NetTopologySuite.IO.GeoJsonReader();

            var feature = geoJsonreader.Read<Feature>(geoJson);

            return feature;
        }

        public virtual async Task<InsideResponse> WithinFence(string id, string geoJson)
        {
            if (null == this.Fence)
            {
                throw new Exception("You must set fence first.");
            }
            var responseObj = new InsideResponse() { Id = id };
            await Task.Run(() =>
            {

                var point = this.ParseFeatures(geoJson).Geometry as Point;
                var within = point.Within(this.Fence);
                responseObj.IsInside = within;
            });

            return responseObj;
        }

        [HttpPost]
        public virtual async Task SetFence(string geoJson)
        {
            await Task.Run(() =>
            {
                var polygon = this.ParseGeometry(geoJson) as Polygon;
                this.Fence = polygon;

                //if (features.Count == 1)
                //{
                //    var feature = features[0];
                //    if (feature.Geometry is IPolygon)
                //    {
                //        var linearRing = (IPolygon)feature.Geometry;
                //        this.Fence = linearRing;
                //    }
                //    else
                //    {
                //        throw new Exception("Fence must be valid OGC polygon.");
                //    }
                //}
            });
        }


        // skriv om, varje klient måste ha ett sin persistent property
        [HttpPost]
        public async void NoticeInsideFence(string geoJson)
        {
            await Notice(true, geoJson);

        }

        [HttpPost]
        public async void NoticeOutsideFence(string geoJson)
        {
            await Notice(false, geoJson);
        }

        async Task Notice(bool insideFence, string geoJson)
        {
            var features = this.ParseGeometry(geoJson);
            //if (features.Count == 1)
            //{
            //    var feature = features[0];
            //    if (insideFence)
            //        await this.InvokeTo(p => feature.Geometry.Within(p.Fence), geoJson, "fencenotice");
            //    else
            //        await this.InvokeTo(p => !(feature.Geometry.Within(p.Fence)), geoJson, "fencenotice");
            //}
            //else
            //{
            //    throw new Exception("It must be exactly one feature.");
            //}
        }
    }
}
