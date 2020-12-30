import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { v4 as uuidv4 } from "uuid";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const center = {
  lat: 52.47653701744309,
  lng: -1.890981567759743,
};
const options = {
  zoomControl: true,
};

function Maps({ markers, setMarkers, eventMarker }) {
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBn62Gatuw8cbCB2LUcuNGv1mVGgakvh4Y",
    libraries,
  });

  const onMapClick = useCallback((e) => {
    {
      console.log("Latitude: ", e.latLng.lat());
      console.log("Longitude: ", e.latLng.lng());
      setMarkers([
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      ]);
    }
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // useEffect(() => {
  //   onMapClick();
  // }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  if (eventMarker) {
    return (
      <div>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map(() => (
            <Marker
              key={uuidv4()}
              position={{ lat: eventMarker.lat, lng: eventMarker.lng }}
              icon={{
                //we can add a url: "smth"; to change the location style
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
        </GoogleMap>
      </div>
    );
  } else {
    return (
      <div>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              key={uuidv4()}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                //we can add a url: "smth"; to change the location style
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
        </GoogleMap>
      </div>
    );
  }
}

export default Maps;
