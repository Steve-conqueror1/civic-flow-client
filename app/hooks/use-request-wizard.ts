"use client";

import { useState, useCallback } from "react";
import type { WizardLocation } from "@/app/types/geocode";

export interface UseRequestWizardReturn {
  location: WizardLocation | null;
  setLocation: (loc: WizardLocation) => void;
  clearLocation: () => void;
}

export function useRequestWizard(): UseRequestWizardReturn {
  const [location, setLocationState] = useState<WizardLocation | null>(null);

  const setLocation = useCallback((loc: WizardLocation) => {
    setLocationState(loc);
  }, []);

  const clearLocation = useCallback(() => {
    setLocationState(null);
  }, []);

  return { location, setLocation, clearLocation };
}
