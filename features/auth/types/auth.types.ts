export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  status: CustomerStatus;
}

export enum CustomerStatus {
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED",
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
