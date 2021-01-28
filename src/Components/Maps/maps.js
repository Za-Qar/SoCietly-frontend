import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Styling
import style from "./maps.module.css";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const center = {
  lat: 52.47653701744309,
  lng: -1.890981567759743,
};

const options = {
  zoomControl: true,
};

// const mapStyles = {
//   width: "100%",
//   height: "100%",
// };

function Maps({ marker, setMarker, isEditing }) {
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: ,
    libraries,
  });

  function onMapClick(e) {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className={style.maps}>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={isEditing ? 13 : 15}
        center={isEditing ? center : marker}
        options={options}
        onClick={(e) => {
          isEditing && onMapClick(e);
        }}
        onLoad={onMapLoad}
      >
        {marker && (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={marker}
            icon={{
              //we can add a url: "smth"; to change the location style
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default Maps;

// style="height: 100vh; width: 100%; position: relative; overflow: hidden;"
