import { useAuth } from "@/hooks/useAuth";
import { ErrorDTO, isErrorDTO } from "@/dto/ErrorDTO";
import { notifications } from "@mantine/notifications";
import { Check, Info, X } from "@phosphor-icons/react";
import callApi from "@/utils/callApi";

export default function useHireApiWithNotification() {
  const { setIsAuthenticated } = useAuth();

  function send<T>(
    {
      api: api,
      titleOnSuccess,
      messageOnSuccess,
      titleOnLoading,
      messageOnLoading,
      messageOnGenericError,
      onComplete = null,
      onError = null,
      onGenericError = null
    }: {
      api: () => Promise<T>
      titleOnSuccess: string,
      messageOnSuccess: string,
      titleOnLoading: string,
      messageOnLoading: string,
      messageOnGenericError: string,
      onComplete?: null | ((_: T) => void),
      onError?: null | ((_: ErrorDTO) => void),
      onGenericError?: null | ((_: unknown) => void)
    }): void {

    const notificationId = notifications.show({
      loading: true,
      title: titleOnLoading,
      message: messageOnLoading,
      autoClose: false,
      withCloseButton: false
    });

    callApi<T>(
      {
        api: api,
        onComplete: (response) => {
          notifications.update({
            id: notificationId,
            color: "teal",
            title: titleOnSuccess,
            message: messageOnSuccess,
            icon: <Check size={16} />,
            loading: false,
            withCloseButton: true,
            autoClose: 2000
          });

          onComplete?.(response);
        },
        onError: (error) => {
          if (error.status === 498) { // invalid jwt
            notifications.hide(notificationId);
            notifications.show({
              color: "blue",
              title: "Authentication",
              message: "Your session has expired. Please log in again.",
              icon: <Info size={16} />,
              loading: false,
              withCloseButton: true,
              autoClose: 2000
            });

            setIsAuthenticated(false);
          } else if (typeof error.message === "string") {
            notifications.update({
              id: notificationId,
              color: "red",
              title: error.error,
              message: error.message,
              icon: <X size={16} />,
              loading: false,
              withCloseButton: true,
              autoClose: 2000
            });
          } else {
            notifications.hide(notificationId);

            for (const key of Object.keys(error.message)) {
              notifications.show({
                color: "red",
                title: error.error,
                message: error.message[key as keyof typeof error.message],
                icon: <X size={16} />,
                loading: false,
                withCloseButton: true,
                autoClose: 2000
              });
            }
          }

          onError?.(error);
        },
        onGenericError: (error) => {
          notifications.update({
            id: notificationId,
            color: "red",
            title: "Generic Error",
            message: messageOnGenericError,
            icon: <X size={16} />,
            loading: false,
            withCloseButton: true,
            autoClose: 2000
          });

          onGenericError?.(error);
        }
      }
    );
  }

  return send;
}
