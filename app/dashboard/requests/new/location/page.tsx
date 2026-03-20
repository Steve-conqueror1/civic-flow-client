"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RequestProgressBar } from "@/components/requests";
import { LocationPicker } from "@/components/requests";
import { LocationTipsCard } from "@/components/requests";
import { RequestContextCard } from "@/components/requests";

const WIZARD_STEPS = ["Description", "Location", "Upload", "Review"];

export default function RequestLocationPage() {
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    undefined,
  );
  const [coords, setCoords] = useState<
    { longitude: number; latitude: number } | undefined
  >(undefined);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
      });
      setSelectedAddress("Your current location");
    });
  };

  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex flex-col gap-4 max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center gap-2 my-4 text-slate-500 dark:text-slate-400 text-sm">
          <span>
            <Link href="/dashboard">Dashboard</Link>
          </span>
          <span>&frasl;</span>
          <span>
            <Link href="/dashboard/requests">Requests</Link>
          </span>
          <span>&frasl;</span>
          <span>
            <Link href="/dashboard/requests/location" className="text-primary">
              Location
            </Link>
          </span>
        </div>

        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
            Pick the location of the issue
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Step 2: Location Details
          </p>
        </div>

        {/* Progress bar */}
        <RequestProgressBar steps={WIZARD_STEPS} currentStep={2} />
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 pb-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mx-auto w-full">
          {/* Left: map + form */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <LocationPicker
              selectedAddress={selectedAddress}
              longitude={coords?.longitude}
              latitude={coords?.latitude}
              onAddressChange={setSelectedAddress}
              onUseMyLocation={handleUseMyLocation}
              onEditLocation={() => setSelectedAddress(undefined)}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" asChild>
                <Link
                  href="/dashboard/requests/new"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back
                </Link>
              </Button>
              <Button
                disabled={!selectedAddress}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-primary/30 flex items-center gap-2"
              >
                Next Step
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Right: sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">
              <RequestContextCard
                descriptionExcerpt="large crater in pavement"
                suggestedCategory="Road Maintenance"
              />
              <LocationTipsCard />
              <div className="text-center">
                <Link
                  href="#"
                  className="text-xs text-slate-400 dark:text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1"
                >
                  Need help with this form?
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
