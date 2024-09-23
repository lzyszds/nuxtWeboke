export interface RequestResult<T> {
  code: number;
  msg: string;
  data: T;
}
