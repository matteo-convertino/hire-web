import { notifications } from "@mantine/notifications";
import { Check, Info, X } from "@phosphor-icons/react";
import { ErrorDTO } from "@/dto/ErrorDTO";
import React from "react";

const showHireNotification = (
  {
    type,
    title,
    message,
    notificationId
  }: {
    type: "loading" | "success" | "error" | "info",
    title: string,
    message: string,
    notificationId?: string,
  }) => {
  const commonProps = {
    title,
    message,
    loading: type === "loading",
    withCloseButton: true,
    autoClose: type === "loading" ? false : 2000,
    icon: type === "error" ? <X size={16} /> : type === "success" ? <Check size={16} /> : <Info size={16} />
  };

  if (type === "loading") {
    return notifications.show({ ...commonProps, color: "gray", autoClose: false });
  }

  if (notificationId) {
    notifications.update({
      id: notificationId,
      ...commonProps,
      color: type === "error" ? "red" : type === "success" ? "teal" : "blue"
    });
  } else {
    notifications.show({
      ...commonProps,
      color: type === "error" ? "red" : type === "success" ? "teal" : "blue"
    });
  }
};

export const showHireLoadingNotification = ({ title, message }: { title: string, message: string }) => {
  return showHireNotification({
    type: "loading",
    title,
    message
  })!;
};

export const showHireSuccessNotification = ({ title, message }: { title: string, message: string }) => {
  return showHireNotification({
    type: "success",
    title,
    message
  })!;
};

export const updateHireSuccessNotification = ({ notificationId, title, message }: {
  notificationId: string,
  title: string,
  message: string
}) => {
  return showHireNotification({
    type: "success",
    title,
    message,
    notificationId
  });
};

export const updateHireErrorNotification = ({ notificationId, title, message }: {
  notificationId: string,
  title: string,
  message: string
}) => {
  return showHireNotification({
    type: "error",
    title,
    message,
    notificationId
  });
};

export const showHireErrorNotification = ({ title, message }: { title: string, message: string }) => {
  return showHireNotification({
    type: "error",
    title,
    message
  })!;
};

export const showHireInfoNotification = ({ title, message }: { title: string, message: string }) => {
  return showHireNotification({
    type: "info",
    title,
    message
  })!;
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
    const { error: title, message } = errorDTO;

    if (typeof message === "string") {
      if (notificationId === null) {
        showHireErrorNotification({ title, message });
      } else {
        updateHireErrorNotification({ notificationId, title, message });
      }
    } else if (typeof message === "object") {
      if (notificationId !== null) notifications.hide(notificationId);

      for (const key in message) {
        const value = message[key];

        if (typeof value === "string") {
          showHireErrorNotification({ title, message: value });
        } else if (Array.isArray(value)) {
          value.forEach((msg) => showHireErrorNotification({ title, message: msg }));
        }
      }
    }
  }
};
