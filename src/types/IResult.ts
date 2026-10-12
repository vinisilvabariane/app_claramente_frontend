export type IResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; description?: string }
