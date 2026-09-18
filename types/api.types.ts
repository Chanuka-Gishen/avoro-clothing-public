export interface ApiResponse<T> {
  responseCode: number;
  responseMessage: string;
  response?: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiErrorResponse {
  responseCode: number;
  responseMessage: string;
  errors?: Record<string, string[]>;
}
