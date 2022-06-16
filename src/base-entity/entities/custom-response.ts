export class CustomResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errorCode?: string;
}

export class PaginationResponse<T> {
  success: boolean;
  data: PaginationData<T>;
  message: string;
}

export class PaginationData<T> {
  currentPage: number;
  totalPage: number;
  list: T[];
}
