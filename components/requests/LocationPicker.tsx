"use client";

import { useState } from "react";
import { Search, LocateFixed, CheckCircle, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MapView from "@/components/maps";

interface LocationPickerProps {
  selectedAddress?: string;
  longitude?: number;
  latitude?: number;
  onAddressChange?: (address: string) => void;
  onUseMyLocation?: () => void;
  onEditLocation?: () => void;
}

export function LocationPicker({
  selectedAddress,
  longitude,
  latitude,
  onAddressChange,
  onUseMyLocation,
  onEditLocation,
}: LocationPickerProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onAddressChange?.(e.target.value);
  };

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
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="e.g. 123 Main St, Edmonton"
              className="h-12 pl-10 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-primary focus:ring-primary"
              aria-label="Search address"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={onUseMyLocation}
            className="h-12 px-4 rounded-lg border-primary text-primary hover:bg-primary/5 font-medium flex items-center gap-2 whitespace-nowrap"
            aria-label="Use my location"
          >
            <LocateFixed className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Use My Location</span>
          </Button>
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
        <MapView longitude={longitude} latitude={latitude} height="320px" />
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
            onClick={onEditLocation}
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
