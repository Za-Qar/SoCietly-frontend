// var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// // mapboxgl.accessToken = 'pk.eyJ1IjoiemFxYXIiLCJhIjoiY2tqNWpzODhiNDYwODJ5bjRzdnl1N2VxYyJ9.IeMAwYQSW3GHKBsCV5RYZQ';
// // var map = new mapboxgl.Map({
// //   container: 'YOUR_CONTAINER_ELEMENT_ID',
// //   style: 'mapbox://styles/mapbox/streets-v11'
// // });

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiemFxYXIiLCJhIjoiY2tqNWpzODhiNDYwODJ5bjRzdnl1N2VxYyJ9.IeMAwYQSW3GHKBsCV5RYZQ";

// class Application extends React.Component {
//   // Code from the next few steps will go here
// }

// ReactDOM.render(<Application />, document.getElementById("app"));

import React, { useState } from "react";
import ReactMapGl from "react-map-gl";

function MapTwo() {
  const [viewport, setViewport] = useState({
    longitude: -1.890981567759743,
    latitude: 52.47653701744309,
    width: "100vp",
    height: "100vh",
    zoom: 10,
  });
  const [markers, setMarkers] = useState([]);

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiemFxYXIiLCJhIjoiY2tqNWw1bGw1NDZmNzJ5bjRyNzF2c3NzbiJ9.ncfFlIcCZLTrUHOiHUmfog"
      mapStyle="mapbox://styles/zaqar/ckj5li97edlzw19mhh43hv516"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      onClick={(e) => {
        setMarkers(e.lngLat);
      }}
    >
      Markers here
    </ReactMapGl>
  );
}

export default MapTwo;
