export interface SendGuestOtpPayload {
  mobile: string;
}

export interface VerifyGuestOtpPayload {
  mobile: string;
  code: string;
}

export interface VerifyGuestOtpResponse {
  verificationToken: string;
  expiresAt?: string;
}
