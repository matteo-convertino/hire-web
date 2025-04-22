import { MantineSize, Modal } from "@mantine/core";
import React from "react";
import { X } from "@phosphor-icons/react";

export const HireModal = (
  {
    title,
    centered = true,
    size = "md",
    opened,
    onClose,
    onExitTransitionEnd,
    children,
    ...rest
  }: {
    title: string,
    centered?: boolean,
    size?: MantineSize
    opened: boolean,
    onClose: () => void,
    onExitTransitionEnd?: () => void,
    children?: React.ReactNode,
  }) => {

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered={centered}
      radius="md"
      size={size}
      closeButtonProps={{
        icon: <X size={20} />
      }}
      onExitTransitionEnd={onExitTransitionEnd}
      {...rest}
    >
      {children}
    </Modal>
  );

};
