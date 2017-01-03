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