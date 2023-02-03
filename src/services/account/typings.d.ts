import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomAccountRequest<RequestPayloadType = any>
  extends Request<{}, any, RequestPayloadType> {
  user: string | JwtPayload;
}

export interface UpdateAccountPayload {
  name: string;
  preferredName: string;
  countryCode: string;
  phoneNumber: string;
  gender: 'M' | 'F';
  dob: string;
}
