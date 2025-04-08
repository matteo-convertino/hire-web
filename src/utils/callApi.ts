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

export async function callApiAsync<T>(
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
  await api()
    .then(res => onComplete?.(res))
    .catch(e => {
      if(e.response && isErrorDTO(e.response.data)) {
        onError?.(e);
        if(e.status === 404) notFound();
      } else {
        onGenericError?.(e);
      }

      // redirect("/error");
      // throw new Error(e);
    });
}
