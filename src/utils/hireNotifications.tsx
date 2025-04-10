import { notifications } from "@mantine/notifications";
import { Check, Info, X } from "@phosphor-icons/react";
import { ErrorDTO } from "@/dto/ErrorDTO";

export const updateHireSuccessNotification = ({ notificationId, title, message }: {
  notificationId: string,
  title: string,
  message: string
}) => {
  notifications.update({
    id: notificationId,
    color: "teal",
    title: title,
    message: message,
    icon: <Check size={16} />,
    loading: false,
    withCloseButton: true,
    autoClose: 2000
  });
};

export const updateHireErrorNotification = ({ notificationId, title, message }: {
  notificationId: string,
  title: string,
  message: string
}) => {
  notifications.update({
    id: notificationId,
    color: "red",
    title: title,
    message: message,
    icon: <X size={16} />,
    loading: false,
    withCloseButton: true,
    autoClose: 2000
  });
};

export const showHireErrorNotification = ({ title, message }: {
  title: string,
  message: string
}) => {
  notifications.show({
    color: "red",
    title: title,
    message: message,
    icon: <X size={16} />,
    loading: false,
    withCloseButton: true,
    autoClose: 2000
  });
};

export const showHireInfoNotification = ({ title, message }: {
  title: string,
  message: string
}) => {
  notifications.show({
    color: "blue",
    title: title,
    message: message,
    icon: <Info size={16} />,
    loading: false,
    withCloseButton: true,
    autoClose: 2000
  });
};

export const showHireErrors = ({ notificationId, errorDTO }: {
  notificationId: string | null,
  errorDTO: ErrorDTO | null
}) => {
  if (errorDTO === null) {
    showHireErrorNotification({
      title: "Generic error",
      message: "Internal server error"
    });
  } else {
    const title = errorDTO.error;
    const message = errorDTO.message;

    if (typeof message === "string") {
      if (notificationId === null) {
        showHireErrorNotification({
          title: title,
          message: message
        });
      } else {
        updateHireErrorNotification({
          notificationId: notificationId,
          title: title,
          message: message
        });
      }
    } else if (typeof message === "object") {
      if (notificationId !== null) notifications.hide(notificationId);

      for (const key in message) {
        const value = message[key];

        if (typeof value === "string") {
          showHireErrorNotification({
            title: title,
            message: value
          });
        } else if (Array.isArray(value)) {
          value.forEach((msg) => {
            showHireErrorNotification({
              title: title,
              message: msg
            });
          });
        }
      }
    }
  }
};
