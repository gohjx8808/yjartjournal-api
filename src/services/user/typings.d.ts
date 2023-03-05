export interface SignUpPayload {
  name: string;
  preferredName?: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  gender: string;
  dob: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface EncryptedPassword {
  iv: string;
  content: string;
}
