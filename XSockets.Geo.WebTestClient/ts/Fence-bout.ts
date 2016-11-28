/// <reference path="../ts_definitions/microsoft.maps.all.d.ts" />
/// <reference path="../fences.ts" />


module Xsockets.Geo {
    export class Fence {
        private map: Microsoft.Maps.Map;

        constructor() {
            this.loadModules();
        }

        private loadModules(): void{
            Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', () => {
                
            });

            Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', (x) => {
                let feature = Microsoft.Maps.GeoJson.read(fences[2], { polygonOptions: { strokeColor: 'orange', strokeThickness: 6, fillColor: 'rgba(0, 255, 255, 0.3)' } });
                document.querySelector("#fenceTextArea").nodeValue = JSON.stringify(feature, null, " ");
                //loadDrawTool(feature);
            });
        
        }
    }
}

//function loadMapScenario() {
//    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
//        
//    });
//    Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {
//        var feature = Microsoft.Maps.GeoJson.read(fences[2], { polygonOptions: { strokeColor: 'orange', strokeThickness: 6, fillColor: 'rgba(0, 255, 255, 0.3)' } });
//        document.querySelector("#fenceTextArea").value = JSON.stringify(feature, null, " ");
//        loadDrawTool(feature);
//    })
//    var loadDrawTool = function (feature) {
//        Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', function () {
//            var tools = new Microsoft.Maps.DrawingTools(map);
//            tools.showDrawingManager(function (manager) {
//                manager.add(feature);

//                manager.drawingStarted.add(function () {
//                    debugger;
//                    printText('Drawing started.');
//                });

//                manager.drawingEnded.add(function (f) {
//                    var modifiedFeature = Microsoft.Maps.GeoJson.write(f);
//                    document.querySelector("#fenceTextArea").value = JSON.stringify(modifiedFeature, null, " ");
//                });

//                manager.drawingErased.add(function () {
//                    debugger;
//                    printText('Drawing erased.');
//                });
//            });
//        });
//    }


//};