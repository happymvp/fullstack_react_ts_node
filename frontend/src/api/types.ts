export type ApiResponse<T> = {
  data: T;
  error: string;
  status: number;
};

export interface Report {
  age: number;
  createdAt: string;
  file: string;
  id: number;
  name: string;
  updatedAt: string;
}

export type ReportFormData = {
  age: number;
  file: Blob | null;
  name: Report["name"];
};
