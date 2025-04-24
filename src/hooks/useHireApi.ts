import { ErrorDTO } from "@/dto/ErrorDTO";
import { notifications } from "@mantine/notifications";
import { callApi } from "@/utils/callApi";
import {
  showHireErrorNotification,
  showHireErrors,
  showHireInfoNotification,
  showHireLoadingNotification,
  updateHireErrorNotification,
  updateHireSuccessNotification
} from "@/utils/hireNotifications";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";

export default function useHireApi() {
  const { setUser } = useAuthStore();

  function send<T>(
    {
      api: api,
      titleOnSuccess,
      messageOnSuccess,
      titleOnLoading,
      messageOnLoading,
      messageOnGenericError = "Generic error",
      onComplete,
      onError,
      onGenericError,
      showNotifications = true
    }: {
      api: () => Promise<T>
      titleOnSuccess?: string,
      messageOnSuccess?: string,
      titleOnLoading?: string,
      messageOnLoading?: string,
      messageOnGenericError?: string,
      onComplete?: (_: T) => void,
      onError?: (_: ErrorDTO) => void,
      onGenericError?: (_: unknown) => void,
      showNotifications?: boolean
    }): void {

    const notificationId = showNotifications ? showHireLoadingNotification({
      title: titleOnLoading!,
      message: messageOnLoading!
    }) : undefined;

    callApi<T>(
      {
        api: api,
        onComplete: (response) => {
          if (showNotifications) {
            updateHireSuccessNotification({
              notificationId: notificationId!,
              title: titleOnSuccess!,
              message: messageOnSuccess!
            });
          }

          onComplete?.(response);
        },
        onError: (error) => {
          if (error.status === 498) { // invalid jwt
            if (showNotifications) notifications.hide(notificationId!);

            showHireInfoNotification({
              title: "Authentication",
              message: "Your session has expired. Please log in again."
            });

            setUser(null);
          } else {
            showHireErrors({ notificationId: notificationId, errorDTO: error });
          }

          onError?.(error);
        },
        onGenericError: (error) => {
          if (showNotifications) {
            updateHireErrorNotification({
              notificationId: notificationId!,
              title: "Generic Error",
              message: messageOnGenericError
            });
          } else {
            showHireErrorNotification({
              title: "Generic Error",
              message: messageOnGenericError
            });
          }

          onGenericError?.(error);
        }

      }
    );
  }

  return send;
}
