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
