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
