var Xsockets;
(function (Xsockets) {
    var Geo;
    (function (Geo) {
        var Guid = (function () {
            function Guid() {
            }
            Guid.newGuid = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };
            return Guid;
        }());
        Geo.Guid = Guid;
    })(Geo = Xsockets.Geo || (Xsockets.Geo = {}));
})(Xsockets || (Xsockets = {}));
//# sourceMappingURL=GUID.js.map