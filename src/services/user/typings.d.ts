export interface SignUpPayload {
  name: string;
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
