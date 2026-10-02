export interface SendGuestMobileOtpPayload {
  mobile: string;
}

export interface SendGuestEmailOtpPayload {
  email: string;
}

export interface VerifyGuestMobileOtpPayload {
  mobile: string;
  code: string;
}

export interface VerifyGuestEmaileOtpPayload {
  email: string;
  code: string;
}

export interface VerifyGuestOtpResponse {
  verificationToken: string;
  expiresAt?: string;
}
