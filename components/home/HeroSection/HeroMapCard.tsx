"use client";

import { useEffect, useState } from "react";
import { Bot, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import MapView from "../../maps";
import { useGetFeaturedServiceRequestQuery } from "@/app/state/api";
import { io } from "socket.io-client";
import type {
  FeaturedServiceRequest,
  RequestStatus,
} from "@/app/types/request";
import { Badge } from "../../ui/badge";

const REQUEST_STATUSES = {
  open: {
    title: "open",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  in_progress: {
    title: "In progress",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  under_review: {
    title: "Under Review",
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },
  pending_review: {
    title: "Pending Review",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  resolved: {
    title: "Resolved",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  rejected: {
    title: "Rejected",
    className: "bg-red-100 text-red-700 border-red-200",
  },
  closed: {
    title: "Closed",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

export function HeroImageCard() {
  const { data, isLoading, isError } = useGetFeaturedServiceRequestQuery();
  const [socketCase, setSocketCase] = useState<FeaturedServiceRequest | null>(
    null,
  );

  // API data is the base; socket updates override it
  const featuredCase = socketCase ?? data?.data ?? null;

  // Socket.IO: listen for real-time updates
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL!);

    socket.on("new_featured_case", (incoming: FeaturedServiceRequest) => {
      setSocketCase((prev) => {
        if (prev?.id === incoming.id) return prev;
        return incoming;
      });
    });

    return () => {
      socket.off("new_featured_case");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 group h-96 sm:h-fit">
      <MapView
        height="100%"
        latitude={featuredCase?.location.lat}
        longitude={featuredCase?.location.lng}
        markerLabel={"REQUEST LOCATION"}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Floating status card */}
      <div className="absolute bottom-0 sm:bottom-4 left-0 right-0 sm:left-6 sm:right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
        {isLoading && (
          <div className="flex items-center gap-3" data-testid="loading-state">
            <Loader2 className="animate-spin text-slate-400" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Loading featured case…
            </span>
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-3" data-testid="error-state">
            <AlertCircle className="text-red-500" />
            <span className="text-sm text-red-600 dark:text-red-400">
              Unable to load featured case
            </span>
          </div>
        )}

        {!isLoading && !isError && featuredCase && (
          <div className="flex items-start gap-4">
            <div
              className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400"
              aria-hidden="true"
            >
              <CheckCircle />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                {featuredCase.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Status:{" "}
                <Badge
                  className={`${REQUEST_STATUSES[featuredCase.status as RequestStatus].className}`}
                >
                  {REQUEST_STATUSES[featuredCase.status as RequestStatus].title}
                </Badge>{" "}
                • {featuredCase.location.address}
              </p>

              <div className="mt-2 text-xs font-medium text-slate-400 flex items-center gap-1">
                <Bot size={20} />
                <span>Routed by AI Assistant</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
