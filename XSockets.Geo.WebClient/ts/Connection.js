/// <reference path="../ts_definitions/xsockets.ts" />
var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        var Connection = (function () {
            function Connection(map) {
                this.map = map;
                this.isOpen = false;
                this.openConnection();
                this.attachEvents();
            }
            Connection.prototype.openConnection = function () {
                var _this = this;
                this.connection = new xsockets.client(this.map.XSocketsUrl, ["FenceController"]);
                this.controller = this.connection.controller("Fence");
                this.controller.onOpen = function () {
                    _this.isOpen = true;
                };
                this.connection.open();
            };
            Connection.prototype.attachEvents = function () {
                var _this = this;
                this.controller.on("fencenotice", function (data) {
                    console.log(data);
                });
                this.controller.on("withinfence", function (data) {
                    _this.map.colorPin(data.Id, data.IsInside);
                });
            };
            Connection.prototype.testPoint = function (id, point) {
                this.controller.invoke("withinfence", { id: id, geoJson: point });
            };
            Connection.prototype.setchannel = function (channel) {
                this.set("setchannel", channel);
            };
            Connection.prototype.setFence = function (fence) {
                this.set("setfence", fence);
            };
            Connection.prototype.set = function (invoke, value) {
                var _this = this;
                if (this.isOpen) {
                    this.controller.invoke(invoke, value);
                }
                else {
                    setTimeout(function () {
                        _this.set(invoke, value);
                    }, 50);
                }
            };
            return Connection;
        }());
        Geo.Connection = Connection;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
