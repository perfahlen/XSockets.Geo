var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        class Config {
        }
        Geo.Config = Config;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
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
                this.connection = new xsockets.client(this.map.XSocketsUrl, ["fence"]);
                this.controller = this.connection.controller("fence");
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
            setchannel(channel) {
                this.set("setchannel", channel);
            }
            setFence(fence) {
                this.set("setfence", fence);
            }
            set(invoke, value) {
                if (this.isOpen) {
                    this.controller.invoke(invoke, value);
                }
                else {
                    setTimeout(() => {
                        this.set(invoke, value);
                    }, 50);
                }
            }
        }
        Geo.Connection = Connection;
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
        class Map {
            constructor(key, XSocketsUrl) {
                this.XSocketsUrl = XSocketsUrl;
                this.attentionOnPolygon = false;
                this.openConnection();
                this.initMap(key);
                this.showInstructions();
            }
            showInstructions() {
                let instructions = document.querySelector("#instructions");
                instructions.style.display = "block";
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
            initMap(key) {
                let mapContainer = document.querySelector("#myMap");
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
                document.querySelector("#myMap").addEventListener("mouseenter", e => {
                    if (!this.attentionOnPolygon) {
                        let polygonBtn = document.querySelector(".polygon");
                        Xsockets.Geo.Effects.blink(polygonBtn, () => {
                            polygonBtn.style.border = "";
                        });
                        this.attentionOnPolygon = true;
                    }
                });
                document.querySelector("#start").addEventListener("click", e => {
                    let channelNameInput = document.querySelector("#channel-name");
                    let whitePlate = document.querySelector("#white-plate");
                    let instruction = document.querySelector("#instructions");
                    let channelNameElement = document.querySelector("#channel");
                    this.hide([whitePlate, instruction]);
                });
            }
            hide(el) {
                el.forEach(e => {
                    e.style.display = "none";
                });
            }
            show(el) {
                el.forEach(e => {
                    e.style.removeProperty("display");
                });
            }
            tryCreatePolygon(polygon) {
                let locations = polygon.getLocations();
                let closingVertice = locations[0].clone();
                locations.push(closingVertice);
                polygon.setLocations(locations);
                return polygon;
            }
            showPointButton() {
                let pointElem = document.querySelector(".point");
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
                this.show([document.querySelector(".point")]);
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
                        this.hide([document.querySelector(".point")]);
                        this.hide([document.querySelector(".polyline")]);
                        this.hide([document.querySelector(".edit")]);
                        this.hide([document.querySelector(".strokestyle")]);
                        this.hide([document.querySelector(".fillstyle")]);
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
//# sourceMappingURL=XSockets.geo.fence.js.map