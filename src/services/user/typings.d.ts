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
  role: number;
}

export interface EncryptedPassword {
  iv: string;
  content: string;
}

export interface AuthenticatedUserData {
  email: string;
  id: number;
}

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
  order: 'DESC' | 'ASC' | 'Default';
}

export interface DbSortByOption {
  name: string;
  order: 'DESC' | 'ASC';
}
