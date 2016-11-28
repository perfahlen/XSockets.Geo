var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        class Connection {
            constructor(map) {
                this.map = map;
                this.isOpen = false;
                this.openConnection();
                this.attachEvents();
            }
            openConnection() {
                this.connection = new xsockets.client("ws://localhost:8080", ["GeoBase"]);
                this.controller = this.connection.controller("geobase");
                this.controller.onOpen = () => {
                    this.isOpen = true;
                };
                this.connection.open();
            }
            attachEvents() {
                this.controller.on("fencenotice", (data) => {
                    console.log(data);
                });
                this.controller.on("withinfence", (data) => {
                    this.map.colorPin(data.Id, data.IsInside);
                });
            }
            testPoint(id, point) {
                this.controller.invoke("withinfence", { id: id, geoJson: point });
            }
            setFence(fence) {
                if (this.isOpen) {
                    this.controller.invoke("setfence", fence);
                }
                else {
                    setTimeout(() => {
                        this.setFence(fence);
                    }, 50);
                }
            }
        }
        Geo.Connection = Connection;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
var fences = [{
        "type": "Feature",
        "properties": { "inside": true },
        "geometry": {
            "type": "Point",
            "coordinates": [
                17.3583984375,
                62.408184595448645
            ]
        }
    }, {
        "type": "Feature",
        "properties": { "inside": false },
        "geometry": {
            "type": "Point",
            "coordinates": [
                15.985107421874998,
                62.47680101352278
            ]
        }
    }, {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        17.369384765625,
                        62.56804487018956
                    ],
                    [
                        17.05078125,
                        62.40055082541711
                    ],
                    [
                        17.281494140624996,
                        62.20651189841766
                    ],
                    [
                        17.764892578124996,
                        62.18088717369617
                    ],
                    [
                        17.808837890625,
                        62.42090322195164
                    ],
                    [
                        17.677001953125,
                        62.59334083012024
                    ],
                    [
                        17.501220703125,
                        62.64891620685224
                    ],
                    [
                        17.369384765625,
                        62.56804487018956
                    ]
                ]
            ]
        }
    }];
var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        class Fence {
            constructor() {
                this.loadModules();
            }
            loadModules() {
                Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', () => {
                });
                Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', (x) => {
                    let feature = Microsoft.Maps.GeoJson.read(fences[2], { polygonOptions: { strokeColor: 'orange', strokeThickness: 6, fillColor: 'rgba(0, 255, 255, 0.3)' } });
                    document.querySelector("#fenceTextArea").nodeValue = JSON.stringify(feature, null, " ");
                });
            }
        }
        Geo.Fence = Fence;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        class Guid {
            static newGuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
        }
        Geo.Guid = Guid;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        class Effects {
            static blink(elem, callback) {
                let blinkCounter = 0;
                let intervalId = setInterval(() => {
                    blinkCounter += 1;
                    blinkCounter % 2 === 1 ? elem.style.visibility = "collapse" : elem.style.visibility = "visible";
                    if (blinkCounter === 8) {
                        clearInterval(intervalId);
                        callback();
                    }
                }, 150);
            }
        }
        Geo.Effects = Effects;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        class Map {
            constructor() {
                this.attentionOnPolygon = false;
                this.openConnection();
                this.initMap();
            }
            openConnection() {
                this.xsocket = new Xsockets.Geo.Connection(this);
            }
            colorPin(id, inside) {
                let primitives = this.pinLayer.getPrimitives();
                primitives.forEach(p => {
                    let pin = p;
                    if (pin.metadata === id) {
                        pin.setOptions({ color: inside ? "lawngreen" : "red" });
                    }
                });
            }
            initMap() {
                let mapContainer = document.querySelector("#myMap");
                this.map = new Microsoft.Maps.Map(mapContainer, {
                    credentials: 'AsXOzwxphj5MnBu0JvpoF7joDb6BdaAa8NHUjUbHj-S9n-_1DzS3vTHfSVmVyXnn',
                    center: new Microsoft.Maps.Location(62.5, 17.2),
                    zoom: 8
                });
                this.addFenceLayer();
                this.addPinLayer();
                this.loadModules();
                this.attachEvents();
                this.mapContainer = document.querySelector("#myMap");
            }
            addFenceLayer() {
                this.fenceLayer = new Microsoft.Maps.Layer("fence");
                this.map.layers.insert(this.fenceLayer);
            }
            addPinLayer() {
                this.pinLayer = new Microsoft.Maps.Layer("pin");
                this.map.layers.insert(this.pinLayer);
            }
            drawPoly(e) {
                if (this.fenceLayer.getPrimitives().length === 0) {
                }
                else {
                    debugger;
                }
            }
            attachEvents() {
                document.querySelector("#drawFence").addEventListener("click", e => {
                    this.mapContainer.style.border = "0.5em solid red";
                    this.mapContainer.style.borderRadius = "1em;";
                });
                document.querySelector("#myMap").addEventListener("mouseenter", e => {
                    if (!this.attentionOnPolygon) {
                        this.mapContainer.style.border = "0.5em solid white";
                        let polygonBtn = document.querySelector(".polygon");
                        polygonBtn.style.border = "solid green 2px";
                        Xsockets.Geo.Effects.blink(polygonBtn, () => {
                            polygonBtn.style.border = "";
                        });
                        this.attentionOnPolygon = true;
                    }
                });
            }
            hide(el) {
                el.style.display = "none";
            }
            show(el) {
                el.style.removeProperty("display");
            }
            tryCreatePolygon(polygon) {
                let locations = polygon.getLocations();
                let closingVertice = locations[0].clone();
                locations.push(closingVertice);
                polygon.setLocations(locations);
                return polygon;
            }
            showPointButton() {
                let pointElem = document.querySelector("#point");
                pointElem.classList.remove("hidden");
            }
            getGeoJsonString(geometry) {
                let geoJson = Microsoft.Maps.GeoJson.write(geometry);
                let geoJsonString = JSON.stringify(geoJson);
                return geoJsonString;
            }
            createFence(polygon) {
                let closedPolygon = this.tryCreatePolygon(polygon);
                let geoJsonString = this.getGeoJsonString(closedPolygon);
                this.xsocket.setFence(geoJsonString);
                this.showPointButton();
                this.show(document.querySelector(".point"));
                let pointBtn = document.querySelector(".point");
                pointBtn.style.border = "solid green 2px";
                Xsockets.Geo.Effects.blink(pointBtn, () => {
                    pointBtn.style.border = "";
                });
            }
            testPoint(guid, point) {
                let geoJsonString = this.getGeoJsonString(point);
                this.xsocket.testPoint(guid, geoJsonString);
            }
            loadModules() {
                Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson');
                Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath');
                Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', () => {
                    let tools = new Microsoft.Maps.DrawingTools(this.map);
                    tools.showDrawingManager((manager) => {
                        this.hide(document.querySelector(".point"));
                        this.hide(document.querySelector(".polyline"));
                        this.hide(document.querySelector(".edit"));
                        this.hide(document.querySelector(".strokestyle"));
                        this.hide(document.querySelector(".fillstyle"));
                        Microsoft.Maps.Events.addHandler(manager, 'drawingEnded', (evt) => {
                            let geometry = evt;
                            switch (geometry.geometryType) {
                                case 1:
                                    let pin = geometry;
                                    let guid = Xsockets.Geo.Guid.newGuid();
                                    pin.metadata = guid;
                                    this.pinLayer.add(pin);
                                    this.testPoint(guid, pin);
                                    break;
                                case 3:
                                    this.createFence(geometry);
                                    break;
                            }
                        });
                    });
                });
            }
        }
        Geo.Map = Map;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
//# sourceMappingURL=XSockets.geo.fence.js.map