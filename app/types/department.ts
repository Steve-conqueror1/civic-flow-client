export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetDepartmentsResponse {
  success: boolean;
  message: string;
  data: {
    departments: Department[];
  };
}
