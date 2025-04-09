import { ErrorDTO, isErrorDTO } from "@/dto/ErrorDTO";
import { notFound, redirect } from "next/navigation";

export function callApi<T>(
  {
    api,
    onComplete = null,
    onError = null,
    onGenericError = null
  }: {
    api: () => Promise<T>,
    onComplete?: null | ((_: T) => void),
    onError?: null | ((_: ErrorDTO) => void),
    onGenericError?: null | ((_: unknown) => void)
  }) {
  api()
    .then(res => onComplete?.(res))
    .catch(e => {
      console.log(e);
      isErrorDTO(e) ? onError?.(e) : onGenericError?.(e);
    });
}

export async function callApiAsync<T>({ api }: { api: () => Promise<T> }): Promise<{
  response: T | null;
  error: ErrorDTO | null | undefined
}> {
  try {
    const response = await api();
    return { response: response, error: undefined };
  } catch (e: any) {
    if (e.response && isErrorDTO(e.response.data)) {
      if (e.status === 404) notFound();
      return { response: null, error: e.response.data };
    } else {
      return { response: null, error: null };
    }
  }
}
