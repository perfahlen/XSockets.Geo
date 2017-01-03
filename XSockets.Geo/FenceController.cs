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
    public class FenceController : XSocketController
    {
        [PersistentProperty]
        public IPolygon Fence { get; set; }
        
        [HttpPost]
        public virtual async Task OnGeoMessage(string geoJson)
        {
            var features = this.ParseFeatureOrGeometry<Geometry>(geoJson);
            await this.InvokeToAll(geoJson, "OnGeoMessage");
        }

        T ParseFeatureOrGeometry<T>(string geoJson) where T : class
        {
            var geoJsonreader = new NetTopologySuite.IO.GeoJsonReader();
            var feature = geoJsonreader.Read<T>(geoJson);
            return feature;
        }

        public virtual async Task<InsideResponse> WithinFence(string id, string geoJson)
        {
            var responseObj = new InsideResponse() { Id = id };
            await Task.Run(() =>
            {
                var point = this.ParseFeatureOrGeometry<Feature>(geoJson).Geometry as Point;
                var within = point.Within(this.Fence);
                responseObj.IsInside = within;
            });

            return responseObj;
        }
        
        public virtual async Task SetFence(string geoJson)
        {
            await Task.Run(() =>
            {
                var polygon = this.ParseFeatureOrGeometry<Geometry>(geoJson) as Polygon;
                this.Fence = polygon;
            });
        }
    }
}
