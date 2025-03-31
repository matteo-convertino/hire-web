import { useAuth } from "@/hooks/useAuth";
import { ErrorDTO } from "@/dto/ErrorDTO";
import callApi from "@/utils/callApi";

export default function useHireApi() {
  const { setUser } = useAuth();

  function send<T>(
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

    callApi<T>(
      {
        api: api,
        onComplete: onComplete,
        onError: (error) => {
          // invalid jwt
          if (error.status === 498) setUser(null);

          onError?.(error);
        },
        onGenericError: onGenericError
      }
    );
  }

  return send;
}
