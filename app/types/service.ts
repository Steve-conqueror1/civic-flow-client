export type Service = {
  id: string;
  name: string;
  description: string;
  slug: string;
  instructions: string;
  categoryId: string;
  departmentId: string;
  minResponseDays: number;
  maxResponseDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Shared paginated envelope
export type PaginatedServiceData = {
  services: Service[];
  total: number;
  page: number;
  limit: number;
};

export type PaginatedServiceResponse = {
  success: boolean;
  message: string;
  data: PaginatedServiceData;
};

export type SingleServiceResponse = {
  success: boolean;
  message: string;
  data: Service;
};

// GET /v1/services
export type GetServicesQuery = {
  page?: number;
  limit?: number;
  includeInactive?: boolean;
};

export type GetServicesResponse = PaginatedServiceResponse;

// GET /v1/services/search
export type SearchServicesQuery = {
  q: string;
  page?: number;
  limit?: number;
};

export type SearchServicesResponse = PaginatedServiceResponse;

// GET /v1/services/grouped/category
export type GetServicesGroupedQuery = {
  limit?: number;
};

export type GetServicesGroupedByCategoryResponse = {
  success: boolean;
  message: string;
  data: {
    groups: Array<{
      category: { id: string; name: string; description: string; slug: string };
      services: Service[];
    }>;
  };
};

// GET /v1/services/grouped/department
export type GetServicesGroupedByDepartmentResponse = {
  success: boolean;
  message: string;
  data: {
    groups: Array<{
      department: { id: string; name: string };
      services: Service[];
    }>;
  };
};

// GET /v1/services/category/{categoryId}
export type GetServicesByCategoryQuery = {
  categoryId: string;
  page?: number;
  limit?: number;
};

export type GetServicesByCategoryResponse = PaginatedServiceResponse;

// GET /v1/services/department/{departmentId}
export type GetServicesByDepartmentQuery = {
  departmentId: string;
  page?: number;
  limit?: number;
};

export type GetServicesByDepartmentResponse = PaginatedServiceResponse;

// GET /v1/services/{id}
export type GetServiceByIdResponse = SingleServiceResponse;

// POST /v1/services
export type CreateServicePayload = {
  name: string;
  description: string;
  instructions: string;
  categoryId: string;
  departmentId: string;
  minResponseDays: number;
  maxResponseDays: number;
};

export type CreateServiceResponse = SingleServiceResponse;

// PATCH /v1/services/{id}
export type UpdateServicePayload = Partial<CreateServicePayload>;

export type UpdateServiceResponse = SingleServiceResponse;

// DELETE /v1/services/{id}
export type DeleteServiceResponse = {
  success: boolean;
  message: string;
};

// PATCH /v1/services/{id}/activate
export type ActivateServiceResponse = SingleServiceResponse;

// PATCH /v1/services/{id}/deactivate
export type DeactivateServiceResponse = SingleServiceResponse;
