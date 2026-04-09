"use client";

import { MapPin } from "lucide-react";
import Map, { Marker, Popup, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";

interface MapViewProps {
  longitude?: number;
  latitude?: number;
  zoom?: number;
  markerLabel?: string;
  height?: string;
}

const DEFAULT_LONGITUDE = -114.097;
const DEFAULT_LATITUDE = 52.309;
const DEFAULT_ZOOM = 11;

function MapView({
  longitude = DEFAULT_LONGITUDE,
  latitude = DEFAULT_LATITUDE,
  zoom = DEFAULT_ZOOM,
  markerLabel,
  height = "400px",
}: MapViewProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const mapRef = React.useRef<MapRef | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();
    const current = map.getCenter();

    if (current.lng !== longitude || current.lat !== latitude) {
      map.flyTo({
        center: [longitude, latitude],
        zoom,
        duration: 1000,
      });
    }
  }, [longitude, latitude, zoom]);

  // Resize the map when its container becomes visible (e.g. inside a hidden stepper panel)
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      mapRef.current?.getMap()?.resize();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!token) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
        style={{ height }}
        data-testid="map-error"
      >
        <p className="text-sm font-medium">Map unavailable at the moment</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100%", height }} data-testid="map-container">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude,
          latitude,
          zoom,
        }}
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <MapPin
            className="text-white hover:cursor-pointer"
            size={28}
            strokeWidth={2}
            fill="#1985f0"
          />
        </Marker>

        {markerLabel && (
          <Popup
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            offset={32}
            closeButton={false}
            closeOnClick={false}
          >
            <span className="text-sm font-medium">{markerLabel}</span>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default React.memo(MapView);
