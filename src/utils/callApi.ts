import { ErrorDTO, ErrorDTOSchema } from "@/dto/ErrorDTO";
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
      const rawData = e?.response?.data;
      const parsed = ErrorDTOSchema.safeParse(rawData);

      parsed.success ? onError?.(parsed.data) : onGenericError?.(e);
    });
}

export async function callApiAsync<T>({ api, onError }: {
  api: () => Promise<T>,
  onError?: ((_: ErrorDTO) => void),
}): Promise<{
  response: T | null,
  error: ErrorDTO | null,
}> {
  try {
    const response = await api();
    return { response: response, error: null };
  } catch (e: any) {
    const rawData = e?.response?.data;
    const parsed = ErrorDTOSchema.safeParse(rawData);

    if (parsed.success) {
      if (onError !== undefined) onError(e.response.data);
      else if (e.status === 404) notFound();

      return { response: null, error: e.response.data };
    }

    redirect("/error");
  }
}
