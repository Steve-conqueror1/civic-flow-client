"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  LocateFixed,
  CheckCircle,
  Pencil,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MapView from "@/components/maps";
import { useLazySearchGeocodesQuery } from "@/app/state/api";
import type { GeocodeResult, WizardLocation } from "@/app/types/geocode";

interface LocationPickerProps {
  selectedAddress?: string;
  longitude?: number;
  latitude?: number;
  onLocationConfirm: (location: WizardLocation) => void;
  onLocationClear: () => void;
  height?: number;
}

async function reverseGeocode(
  lng: number,
  lat: number,
): Promise<string | null> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&limit=1`,
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.features?.[0]?.place_name ?? null;
  } catch {
    return null;
  }
}

export function LocationPicker({
  selectedAddress,
  longitude,
  latitude,
  onLocationConfirm,
  onLocationClear,
  height = 320,
}: LocationPickerProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<GeocodeResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [triggerSearch, { isFetching: isSearching }] =
    useLazySearchGeocodesQuery();

  // Debounced search
  useEffect(() => {
    const trimmed = searchInput.trim();
    if (!trimmed || trimmed.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const result = await triggerSearch({
          q: `${trimmed}, Alberta`,
          limit: 5,
        }).unwrap();
        setSearchResults(result.data.results);
        setShowDropdown(result.data.results.length > 0);
      } catch {
        setSearchResults([]);
        setShowDropdown(false);
        setGeoError("Address search failed. Please try again.");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput, triggerSearch]);

  // Select a result from the dropdown
  const handleSelectResult = useCallback(
    (result: GeocodeResult) => {
      onLocationConfirm({
        address: result.placeName,
        latitude: result.latitude,
        longitude: result.longitude,
      });
      setSearchInput(result.placeName);
      setShowDropdown(false);
      setSearchResults([]);
      setGeoError(null);
    },
    [onLocationConfirm],
  );

  // Use My Location
  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const address = await reverseGeocode(lng, lat);
        onLocationConfirm({
          address: address ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          latitude: lat,
          longitude: lng,
        });
        setSearchInput(address ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoError(
            "Location access was denied. Please enable it in your browser settings.",
          );
        } else {
          setGeoError("Unable to determine your location. Please try again.");
        }
      },
      { timeout: 10000 },
    );
  }, [onLocationConfirm]);

  // Drag end handler
  const handleDragEnd = useCallback(
    async (lng: number, lat: number) => {
      setIsReverseGeocoding(true);
      setGeoError(null);
      const address = await reverseGeocode(lng, lat);
      if (address) {
        onLocationConfirm({ address, latitude: lat, longitude: lng });
        setSearchInput(address);
      } else {
        setGeoError("Could not resolve address for this location.");
        onLocationConfirm({
          address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          latitude: lat,
          longitude: lng,
        });
        setSearchInput(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      }
      setIsReverseGeocoding(false);
    },
    [onLocationConfirm],
  );

  // Edit / clear
  const handleEdit = useCallback(() => {
    onLocationClear();
    setSearchInput("");
    setSearchResults([]);
    setShowDropdown(false);
    setGeoError(null);
  }, [onLocationClear]);

  return (
    <div className="bg-white dark:bg-[#1a2634] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Where is the issue located?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Drag the pin to the exact location or search for an address. Accurate
          location helps our team respond faster.
        </p>
      </div>

      {/* Address search */}
      <div className="relative mb-4 z-20">
        <Label
          htmlFor="address-search"
          className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
        >
          Search Address
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"
              aria-hidden="true"
            />
            <Input
              id="address-search"
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setGeoError(null);
              }}
              placeholder="e.g. 123 Main St, Edmonton"
              className="h-12 pl-10 pr-10 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-primary focus:ring-primary"
              aria-label="Search address"
              autoComplete="off"
            />
            {isSearching && (
              <Loader2
                className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 animate-spin"
                aria-hidden="true"
              />
            )}

            {/* Search results dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <ul
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1a2634] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-30"
                role="listbox"
                aria-label="Address search results"
              >
                {searchResults.map((result, index) => (
                  <li
                    key={`${result.longitude}-${result.latitude}-${index}`}
                    role="option"
                    aria-selected={false}
                    className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-primary/5 cursor-pointer border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectResult(result);
                    }}
                  >
                    {result.placeName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="h-12 px-4 rounded-lg border-primary text-primary hover:bg-primary/5 font-medium flex items-center gap-2 whitespace-nowrap"
            aria-label="Use my location"
          >
            {isLocating ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <LocateFixed className="size-4" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">
              {isLocating ? "Locating..." : "Use My Location"}
            </span>
          </Button>
        </div>

        {/* Error message */}
        {geoError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {geoError}
          </p>
        )}
      </div>

      {/* Map */}
      <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
        {isReverseGeocoding && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-black/30">
            <Loader2 className="size-6 text-primary animate-spin" />
          </div>
        )}
        <MapView
          longitude={longitude}
          latitude={latitude}
          height={`${height}px`}
          draggable
          onLocationChange={handleDragEnd}
        />
      </div>

      {/* Selected location confirmation */}
      {selectedAddress && (
        <div className="mt-2 p-4 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-3">
          <CheckCircle
            className="size-5 text-primary mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Location Pin Selected
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
              {selectedAddress}
            </p>
          </div>
          <button
            type="button"
            onClick={handleEdit}
            className="ml-auto text-sm text-primary font-medium hover:underline flex items-center gap-1 shrink-0"
            aria-label="Edit selected location"
          >
            <Pencil className="size-3" aria-hidden="true" />
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
