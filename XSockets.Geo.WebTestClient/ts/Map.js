/// <reference path="../ts_definitions/microsoft.maps.all.d.ts" />
/// <reference path="../ts_definitions/modules/geojson.d.ts" />
/// <reference path="../ts_definitions/modules/drawingtools.d.ts" />
/// <reference path="../ts_definitions/modules/spatialmath.d.ts" />
/// <reference path="../ts_definitions/xsockets.ts" />
var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        var Map = (function () {
            function Map(key, XSocketsUrl) {
                this.XSocketsUrl = XSocketsUrl;
                this.attentionOnPolygon = false;
                this.openConnection();
                this.initMap(key);
                this.showInstructions();
            }
            Map.prototype.showInstructions = function () {
                var instructions = document.querySelector("#instructions");
                instructions.style.display = "block";
            };
            Map.prototype.openConnection = function () {
                this.xsocket = new Xsockets.Geo.Connection(this);
            };
            Map.prototype.colorPin = function (id, inside) {
                var primitives = this.pinLayer.getPrimitives();
                primitives.forEach(function (p) {
                    var pin = p;
                    if (pin.metadata === id) {
                        pin.setOptions({ color: inside ? "lawngreen" : "red" });
                    }
                });
            };
            Map.prototype.initMap = function (key) {
                var mapContainer = document.querySelector("#myMap");
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
            };
            Map.prototype.addFenceLayer = function () {
                this.fenceLayer = new Microsoft.Maps.Layer("fence");
                this.map.layers.insert(this.fenceLayer);
            };
            Map.prototype.addPinLayer = function () {
                this.pinLayer = new Microsoft.Maps.Layer("pin");
                this.map.layers.insert(this.pinLayer);
            };
            Map.prototype.drawPoly = function (e) {
                //check if it is first entity
                if (this.fenceLayer.getPrimitives().length === 0) {
                }
                else {
                    debugger;
                }
            };
            Map.prototype.attachEvents = function () {
                var _this = this;
                document.querySelector("#myMap").addEventListener("mouseenter", function (e) {
                    if (!_this.attentionOnPolygon) {
                        var polygonBtn_1 = document.querySelector(".polygon");
                        Xsockets.Geo.Effects.blink(polygonBtn_1, function () {
                            polygonBtn_1.style.border = "";
                        });
                        _this.attentionOnPolygon = true;
                    }
                });
                document.querySelector("#start").addEventListener("click", function (e) {
                    var channelNameInput = document.querySelector("#channel-name");
                    var whitePlate = document.querySelector("#white-plate");
                    var instruction = document.querySelector("#instructions");
                    var channelNameElement = document.querySelector("#channel");
                    _this.hide([whitePlate, instruction]);
                });
            };
            Map.prototype.hide = function (el) {
                el.forEach(function (e) {
                    e.style.display = "none";
                });
            };
            Map.prototype.show = function (el) {
                el.forEach(function (e) {
                    e.style.removeProperty("display");
                });
            };
            Map.prototype.tryCreatePolygon = function (polygon) {
                var locations = polygon.getLocations();
                var closingVertice = locations[0].clone();
                locations.push(closingVertice);
                polygon.setLocations(locations);
                return polygon;
            };
            Map.prototype.showPointButton = function () {
                var pointElem = document.querySelector(".point");
                pointElem.classList.remove("hidden");
            };
            Map.prototype.getGeoJsonString = function (geometry) {
                var geoJson = Microsoft.Maps.GeoJson.write(geometry);
                var geoJsonString = JSON.stringify(geoJson);
                return geoJsonString;
            };
            Map.prototype.createFence = function (polygon) {
                var closedPolygon = this.tryCreatePolygon(polygon);
                var geoJsonString = this.getGeoJsonString(closedPolygon);
                this.xsocket.setFence(geoJsonString);
                this.showPointButton();
                this.show([document.querySelector(".point")]);
                var pointBtn = document.querySelector(".point");
                pointBtn.style.border = "solid green 2px";
                Xsockets.Geo.Effects.blink(pointBtn, function () {
                    pointBtn.style.border = "";
                });
            };
            Map.prototype.testPoint = function (guid, point) {
                var geoJsonString = this.getGeoJsonString(point);
                this.xsocket.testPoint(guid, geoJsonString);
            };
            Map.prototype.loadModules = function () {
                var _this = this;
                Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson');
                Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath');
                Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', function () {
                    var tools = new Microsoft.Maps.DrawingTools(_this.map);
                    tools.showDrawingManager(function (manager) {
                        _this.hide([document.querySelector(".point")]);
                        _this.hide([document.querySelector(".polyline")]);
                        _this.hide([document.querySelector(".edit")]);
                        _this.hide([document.querySelector(".strokestyle")]);
                        _this.hide([document.querySelector(".fillstyle")]);
                        Microsoft.Maps.Events.addHandler(manager, 'drawingEnded', function (evt) {
                            var geometry = evt;
                            switch (geometry.geometryType) {
                                case 1:
                                    var pin = geometry;
                                    var guid = Xsockets.Geo.Guid.newGuid();
                                    pin.metadata = guid;
                                    _this.pinLayer.add(pin);
                                    _this.testPoint(guid, pin);
                                    break;
                                case 3:
                                    _this.createFence(geometry);
                                    break;
                            }
                        });
                    });
                });
            };
            return Map;
        }());
        Geo.Map = Map;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
//# sourceMappingURL=Map.js.map