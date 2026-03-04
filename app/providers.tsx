"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StoreProvider from "./state/redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StoreProvider>
  );
};

export default Providers;
