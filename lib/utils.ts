import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type RTKError = FetchBaseQueryError | SerializedError;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getErrorMessage(error: RTKError): string {
  if ("status" in error) {
    if ("data" in error && error.data) {
      const data = error.data as { message?: string };
      if (data?.message) {
        return data.message;
      }
      return data?.message || "Something went wrong";
    }

    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }
  }

  if ("message" in error && error.message) {
    return error.message;
  }

  return "Something went wrong.";
}

export function fileFormatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getFileType(name: string): string {
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE";
  return ext;
}
