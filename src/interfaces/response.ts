export interface IResponse<T = unknown> {
  status: "success" | "error";
  message: string;
  data?: T;
  error?: string;
}
