export type LoginFormValues = {
  email: string;
  password: string;
};

export type Role = "citizen" | "admin" | null;

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: Role;
};

export type LoginResponse = {
  user: AuthUser;
};

export type RegisterResponse = {
  message: string;
};
