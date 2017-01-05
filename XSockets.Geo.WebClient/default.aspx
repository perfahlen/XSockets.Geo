<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="XSockets.Geo.WebTestClient._default" %>

<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8" />

    <link href="xsockets.geo.css" rel="stylesheet" />
</head>
<body onload="new Xsockets.Geo.Map('<%= BingKey %>', '<%=XSocketsUrl %>');">


    <div id="myMap">
    </div>
    <div id="white-plate"></div>
    <div id="instructions">
        <div>
            <h1 id="instructions-header">
                Real time geofencing with XSockets and Bing Maps!
            </h1>
            <hr />
            <div id="instructions-content">
                <p class="instruction-text">
                    This is an example of capabilities combining real time and GIS. The backend is powered by XSockets and frontend is Bing Maps.
                </p>
                <p class="instruction-text">
                    Press the polygon <span class="polygon-instruction"></span> button at the top left corner to draw your fence.
                </p>
                <p>
                    <div id="start" class="button margin-bottom margin-top pull-right">
                        OK, Got It!
                    </div>
                </p>
            </div>
        </div>
    </div>
    <script src="scripts/XSockets/xsockets.latest.js"></script>
    <script src="app/XSockets.geo.fence.js"></script>
    <script type='text/javascript' src='http://www.bing.com/api/maps/mapcontrol?branch=release' async defer></script>
</body>
</html>
