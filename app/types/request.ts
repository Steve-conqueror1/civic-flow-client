export interface ServiceRequestLocation {
  lat: number;
  lng: number;
  address: string;
}

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
