/// <reference path="../ts_definitions/microsoft.maps.all.d.ts" />
/// <reference path="../ts_definitions/modules/geojson.d.ts" />
/// <reference path="../ts_definitions/modules/drawingtools.d.ts" />
/// <reference path="../ts_definitions/modules/spatialmath.d.ts" />
/// <reference path="../ts_definitions/xsockets.ts" />


namespace Xsockets.Geo {

    export class Map {

        private map: Microsoft.Maps.Map;
        private mapContainer: HTMLDivElement;
        private fenceLayer: Microsoft.Maps.Layer;
        private pinLayer: Microsoft.Maps.Layer;
        private attentionOnPolygon = false;
        private xsocket: Xsockets.Geo.Connection;

        constructor(key: string, public XSocketsUrl: string) {
            this.openConnection();
            this.initMap(key);
            this.showInstructions();
        }

        private showInstructions(): void {
            let instructions = document.querySelector("#instructions") as HTMLDivElement;
            instructions.style.display = "block";
        }

        private openConnection() {
            this.xsocket = new Xsockets.Geo.Connection(this);
        }

        public colorPin(id: string, inside: boolean): void {
            let primitives = this.pinLayer.getPrimitives();


            primitives.forEach(p => {
                let pin = p as Microsoft.Maps.Pushpin;
                if (pin.metadata === id) {
                    pin.setOptions({ color: inside ? "lawngreen" : "red" });
                }
            });

        }

        private initMap(key: string): void {
            let mapContainer = document.querySelector("#myMap") as HTMLDivElement;
            this.map = new Microsoft.Maps.Map(mapContainer, {
                credentials: key,
                center: new Microsoft.Maps.Location(62.5, 17.2),
                showZoomButtons: false,
                showMapTypeSelector: false,
                showLocateMeButton: false,
                zoom: 8
            });
            this.addFenceLayer();
            this.addPinLayer();
            this.loadModules();
            this.attachEvents();
            this.mapContainer = document.querySelector("#myMap") as HTMLDivElement;
        }

        private addFenceLayer(): void {
            this.fenceLayer = new Microsoft.Maps.Layer("fence");
            this.map.layers.insert(this.fenceLayer);
        }

        private addPinLayer(): void {
            this.pinLayer = new Microsoft.Maps.Layer("pin");
            this.map.layers.insert(this.pinLayer);
        }

        private drawPoly(e: Microsoft.Maps.ILayerMouseEventArgs): void {
            //check if it is first entity
            if (this.fenceLayer.getPrimitives().length === 0) {

            } else {
                debugger;
            }
        }

        private attachEvents(): void {

            document.querySelector("#myMap").addEventListener("mouseenter", e => {
                if (!this.attentionOnPolygon) {
                    let polygonBtn = document.querySelector(".polygon") as HTMLLIElement;
                    Xsockets.Geo.Effects.blink(polygonBtn, () => {
                        polygonBtn.style.border = "";
                    });
                    this.attentionOnPolygon = true;
                }
            });

            document.querySelector("#start").addEventListener("click", e => {
                let channelNameInput = document.querySelector("#channel-name") as HTMLInputElement;
                let whitePlate = (document.querySelector("#white-plate") as HTMLDivElement);
                let instruction = (document.querySelector("#instructions") as HTMLDivElement);
                let channelNameElement = (document.querySelector("#channel") as HTMLSpanElement);
                this.hide([whitePlate, instruction]);
            });
        }

        private hide(el: Array<HTMLElement>): void {
            el.forEach(e => {
                e.style.display = "none";
            });
        }

        private show(el: Array<HTMLElement>): void {
            el.forEach(e => {
                e.style.removeProperty("display");
            });
        }

        private tryCreatePolygon(polygon: Microsoft.Maps.Polygon): Microsoft.Maps.IPrimitive {
            let locations = polygon.getLocations();
            let closingVertice = locations[0].clone();
            locations.push(closingVertice);
            polygon.setLocations(locations);
            return polygon;
        }

        private showPointButton(): void {
            let pointElem = document.querySelector(".point") as HTMLDivElement;
            pointElem.classList.remove("hidden");
        }

        private getGeoJsonString(geometry: Microsoft.Maps.IPrimitive): string {
            let geoJson = Microsoft.Maps.GeoJson.write(geometry);
            let geoJsonString = JSON.stringify(geoJson);
            return geoJsonString;
        }

        private createFence(polygon: Microsoft.Maps.Polygon): void {
            let closedPolygon = this.tryCreatePolygon(polygon)
            let geoJsonString = this.getGeoJsonString(closedPolygon);

            this.xsocket.setFence(geoJsonString);
            this.showPointButton();
            this.show([(document.querySelector(".point") as HTMLElement)]);
            let pointBtn = document.querySelector(".point") as HTMLLIElement;
            pointBtn.style.border = "solid green 2px";
            Xsockets.Geo.Effects.blink(pointBtn, () => {
                pointBtn.style.border = "";
            });
        }

        private testPoint(guid: string, point: Microsoft.Maps.Pushpin): void {
            let geoJsonString = this.getGeoJsonString(point);
            this.xsocket.testPoint(guid, geoJsonString);
        }

        private loadModules(): void {
            Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson');
            Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath');

            Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', () => {
                let tools = new Microsoft.Maps.DrawingTools(this.map);

                tools.showDrawingManager((manager) => {
                    this.hide([(document.querySelector(".point") as HTMLLIElement)]);
                    this.hide([(document.querySelector(".polyline") as HTMLLIElement)]);
                    this.hide([(document.querySelector(".edit") as HTMLLIElement)]);
                    this.hide([(document.querySelector(".strokestyle") as HTMLLIElement)]);
                    this.hide([(document.querySelector(".fillstyle") as HTMLLIElement)]);
                    Microsoft.Maps.Events.addHandler(manager, 'drawingEnded', (evt) => {
                        let geometry = evt as any;
                        switch (geometry.geometryType) {
                            case 1:
                                let pin = geometry as Microsoft.Maps.Pushpin;
                                let guid = Xsockets.Geo.Guid.newGuid();
                                pin.metadata = guid;
                                this.pinLayer.add(pin);
                                this.testPoint(guid, pin);
                                break;
                            case 3:
                                this.createFence(geometry as Microsoft.Maps.Polygon);
                                break;
                        }
                    });
                });
            });
        }
    }
}