export interface UpdateAccountPayload {
  name: string;
  preferredName: string;
  countryCode: string;
  phoneNumber: string;
  gender: 'M' | 'F';
  dob: string;
}
