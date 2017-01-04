var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        var Effects = (function () {
            function Effects() {
            }
            Effects.blink = function (elem, callback) {
                var blinkCounter = 0;
                var intervalId = setInterval(function () {
                    blinkCounter += 1;
                    blinkCounter % 2 === 1 ? elem.style.visibility = "collapse" : elem.style.visibility = "visible";
                    if (blinkCounter === 8) {
                        clearInterval(intervalId);
                        callback();
                    }
                }, 150);
            };
            return Effects;
        }());
        Geo.Effects = Effects;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
//# sourceMappingURL=Effects.js.map