/// <reference path="ts_definitions/microsoft.maps.all.d.ts" />
var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        var FenceBout = (function () {
            function FenceBout() {
            }
            return FenceBout;
        })();
        Geo.FenceBout = FenceBout;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AsXOzwxphj5MnBu0JvpoF7joDb6BdaAa8NHUjUbHj-S9n-_1DzS3vTHfSVmVyXnn',
        center: new Microsoft.Maps.Location(62.5, 17.2),
        zoom: 8
    });
    Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {
        var feature = Microsoft.Maps.GeoJson.read(fences[2], { polygonOptions: { strokeColor: 'orange', strokeThickness: 6, fillColor: 'rgba(0, 255, 255, 0.3)' } });
        document.querySelector("#fenceTextArea").value = JSON.stringify(feature, null, " ");
        loadDrawTool(feature);
    });
    var loadDrawTool = function (feature) {
        Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', function () {
            var tools = new Microsoft.Maps.DrawingTools(map);
            tools.showDrawingManager(function (manager) {
                manager.add(feature);
                manager.drawingStarted.add(function () {
                    debugger;
                    printText('Drawing started.');
                });
                manager.drawingEnded.add(function (f) {
                    var modifiedFeature = Microsoft.Maps.GeoJson.write(f);
                    document.querySelector("#fenceTextArea").value = JSON.stringify(modifiedFeature, null, " ");
                });
                manager.drawingErased.add(function () {
                    debugger;
                    printText('Drawing erased.');
                });
            });
        });
    };
}
;
