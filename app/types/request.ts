export interface ServiceRequestLocation {
  lat: number;
  lng: number;
  address: string;
}

export type RequestStatus =
  | "open"
  | "under_review"
  | "in_progress"
  | "pending_review"
  | "resolved"
  | "closed"
  | "rejected";

export interface FeaturedServiceRequest {
  id: string;
  userId: string;
  serviceId: string;
  title: string;
  description: string;
  note: string | null;
  status: string;
  location: ServiceRequestLocation;
  attachments: string[];
  assignedTo: string | null;
  priority: number;
  aiSummary: string;
  submittedAt: string;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetFeaturedServiceRequestResponse {
  success: boolean;
  message: string;
  data: FeaturedServiceRequest;
}

// AI Analysis types
export interface AnalyseRequestPayload {
  title: string;
  description: string;
  note?: string;
}

export interface AnalyseRequestAlert {
  title: string;
  type: string;
  message: string;
}

export interface AnalyseRequestData {
  category: {
    name: string;
    matchPercentage: number;
  };
  service: {
    name: string;
    confidence: number;
  };
  summary: string[];
  alert: AnalyseRequestAlert;
}

export interface AnalyseRequestResponse {
  success: boolean;
  message: string;
  data: AnalyseRequestData;
}
