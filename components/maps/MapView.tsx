"use client";

import { MapPin } from "lucide-react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

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

export default function MapView({
  longitude = DEFAULT_LONGITUDE,
  latitude = DEFAULT_LATITUDE,
  zoom = DEFAULT_ZOOM,
  markerLabel,
  height = "400px",
}: MapViewProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
        style={{ height }}
        data-testid="map-error"
      >
        <p className="text-sm font-medium">
          Map unavailable: NEXT_PUBLIC_MAPBOX_TOKEN is not set.
        </p>
      </div>
    );
  }

  return (
    <div style={{ height }} data-testid="map-container">
      <Map
        mapboxAccessToken={token}
        initialViewState={{ longitude, latitude, zoom }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <MapPin
            className="text-primary hover:cursor-pointer"
            size={28}
            strokeWidth={4}
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
