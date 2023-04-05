import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomAuthenticatedRequest<RequestPayloadType = any>
  extends Request<{}, any, RequestPayloadType> {
  user?: string | JwtPayload;
}

export interface OptionData {
  id: number;
  name: string;
}
