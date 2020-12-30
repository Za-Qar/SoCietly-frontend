import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const options = {
  zoomControl: true,
};

function Maps({ markers, setMarkers, eventMarker }) {
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBn62Gatuw8cbCB2LUcuNGv1mVGgakvh4Y",
    libraries,
  });

  function eventMarkers() {
    if (eventMarker) {
      console.log("setting markers");
      setMarkers([
        {
          lat: eventMarker.lat,
          lng: eventMarker.lng,
        },
      ]);
    }
  }

  useEffect(() => {
    eventMarkers();
  }, []);

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

  // function onMapClick() {
  //   console.log("Latitude: ", e.latLng.lat());
  //   console.log("Longitude: ", e.latLng.lng());
  //   setMarkers([
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //     },
  //   ]);
  // }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={
          eventMarker || {
            lat: 52.47653701744309,
            lng: -1.890981567759743,
          }
        }
        options={options}
        onClick={eventMarker ? eventMarkers : onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={
              eventMarker || {
                lat: marker.lat,
                lng: marker.lng,
              }
            }
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

export default Maps;
