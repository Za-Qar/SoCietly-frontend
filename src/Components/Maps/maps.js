import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

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

function Maps({ markers, setMarkers }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBn62Gatuw8cbCB2LUcuNGv1mVGgakvh4Y",
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

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Search panTo={panTo} />

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
            key={`${marker.lat}-${marker.lng}`}
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

export default Maps;

function Search(panTo) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 52.47653701744309, lng: () => -1.890981567759743 },
      radius: 200 * 1000,
    },
  });

  return (
    <div>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("error");
          }
          console.log(address);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description}></ComboboxOption>
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
