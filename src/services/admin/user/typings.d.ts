import { AddAddressPayload, UpdateAddressPayload } from '../../address/typings';

export interface GetUserListPayload {
  sortBy?: SortByOption;
  filter?: string;
  pagination: {
    pageSize: number;
    page: number;
  };
}

export interface SortByOption {
  name: string;
  order: 'DESC' | 'ASC' | '';
}

export interface AddNewUserPayload {
  name: string;
  preferredName?: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  roleIds?: number[];
}

export interface UpdateUserPayload extends UserIdPayload {
  name: string;
  preferredName: string;
  countryCode: string;
  phoneNumber: string;
  gender: 'M' | 'F';
  dob: string;
}

export interface UserIdPayload {
  userId: number;
}

export interface RoleIdPayload {
  roleId: number;
}

export type DeleteUserPayload = UserIdPayload;

export type AddUserRolePayload = UserIdPayload & RoleIdPayload;

export interface DeleteUserRolePayload {
  userRoleId: number;
}

export type AdminAddAddressPayload = AddAddressPayload & UserIdPayload;
export type AdminUpdateAddressPayload = UpdateAddressPayload & UserIdPayload;
