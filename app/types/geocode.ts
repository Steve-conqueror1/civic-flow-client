export interface GeocodeResult {
  placeName: string;
  longitude: number;
  latitude: number;
  placeType: string[];
}

export interface SearchGeocodesQuery {
  q: string;
  limit?: number;
}

export interface SearchGeocodesResponse {
  success: boolean;
  data: {
    results: GeocodeResult[];
  };
}

export interface WizardLocation {
  address: string;
  latitude: number;
  longitude: number;
}
