import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";

function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      setMarker({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });

      props.setLocationFromMap(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }, []);

  const [marker, setMarker] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
  });

  const handleMarkerDragEnd = (event) => {
    const { lngLat } = event;
    if (lngLat && !isNaN(lngLat.lng) && !isNaN(lngLat.lat)) {
      setMarker({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      });

      props.setLocationFromMap(lngLat.lat, lngLat.lng);
    }
  };

  return (
    <MapGL
      mapboxAccessToken="pk.eyJ1IjoicmVoYW40Nzc4IiwiYSI6ImNsaGp4emk0djBtamIzbG54b3lwOXJ3ZWEifQ.mjIQF_n-h5-uBP0E4F3aBQ"
      width="100%"
      height="250px"
      initialViewState={viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      style={{ height: 250, borderRadius: "5px", padding: "5px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker
        latitude={marker.latitude}
        longitude={marker.longitude}
        offsetLeft={-20}
        offsetTop={-10}
        color="red"
        draggable={true}
        onDragEnd={handleMarkerDragEnd}
        zIndex={10}
      />

      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        dragPan={false}
        trackUserLocation={true}
        showUserLocation={true}
        auto={true}
      />
      <NavigationControl position="bottom-right" />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "5px",
          color: "white",
          backgroundColor: "black",
          opacity: 0.8,
          borderRadius: "2px",
        }}
      >
        Drag the marker to the desired location
      </div>
    </MapGL>
  );
}

export default Map;
