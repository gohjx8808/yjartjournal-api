import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomAccountRequest extends Request {
  user: string | JwtPayload;
}
