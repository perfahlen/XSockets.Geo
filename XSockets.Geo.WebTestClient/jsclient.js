
var xsocketsgeo = (function () {
   
    var xsocketsgeo = function (callback) {
        this.conn = new xsockets.client("ws://localhost:4502", ["GeoBase"]);
        this.geoCtrl = this.conn.controller("geobase");
       

        this.geoCtrl.onOpen = function () {
            this.invoke("setfence", fences[2]);
            callback(this);
        };

        this.conn.open();
    };

    var setChannel = function(){};

    var setFence = function () {
        this.geoCtrol.on("fencenotice", function (data) {
            console.log(data);
        });
    }

    xsocketsgeo.prototype.testInsideFence = function (xgeo) {
        xgeo.geoCtrl.on("WithinFence", function (insideFence) {
            console.log(insideFence);
        });
        xgeo.geoCtrl.invoke("WithinFence", fences[0]);
        xgeo.geoCtrl.invoke("WithinFence", fences[1]);
    };


    window.onload = function () {
        document.querySelector("button").addEventListener("click", function () {
            var geo = new xsocketsgeo(function (ctrl) {
                debugger;
                geo.testInsideFence(geo);
            });
            
           
        });
    };


    return xsocketsgeo;
})();