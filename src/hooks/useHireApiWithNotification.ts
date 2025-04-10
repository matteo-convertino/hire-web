import { useAuth } from "@/features/auth/hooks/useAuth";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { notifications } from "@mantine/notifications";
import { callApi } from "@/utils/callApi";
import {
  showHireErrors,
  showHireInfoNotification,
  updateHireErrorNotification,
  updateHireSuccessNotification
} from "@/utils/hireNotifications";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";

export default function useHireApiWithNotification() {
  // const { setUser } = useAuth();
  const { setUser } = useAuthStore();

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
          updateHireSuccessNotification({
            notificationId: notificationId,
            title: titleOnSuccess,
            message: messageOnSuccess
          });

          onComplete?.(response);
        },
        onError: (error) => {
          if (error.status === 498) { // invalid jwt
            notifications.hide(notificationId);
            showHireInfoNotification({
              title: "Authentication",
              message: "Your session has expired. Please log in again."
            });

            setUser(null);
          } else {
            showHireErrors({ notificationId: notificationId, errorDTO: error });
          }/*else if (typeof error.message === "string") {
            updateHireErrorNotification({
              notificationId: notificationId,
              title: error.error,
              message: error.message
            });
          } else {
            notifications.hide(notificationId);

            for (const key of Object.keys(error.message)) {
              showHireErrorNotification({
                title: error.error,
                message: error.message[key as keyof typeof error.message],
              })

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
          }*/

          onError?.(error);
        },
        onGenericError: (error) => {
          updateHireErrorNotification({
            notificationId: notificationId,
            title: "Generic Error",
            message: messageOnGenericError
          });
          onGenericError?.(error);
        }
      }
    );
  }

  return send;
}
