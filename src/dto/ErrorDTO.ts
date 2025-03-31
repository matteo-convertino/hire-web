export type ErrorDTO = {
  timestamp: Date
  status: number
  error: string
  message: string | { [key: string]: string } | { [key: string]: string[] }
  path: string
}

export function isErrorDTO(obj: any): obj is ErrorDTO {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.code === "number" &&
    typeof obj.message === "string"
  );
}

