"use client";

import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";

export const HireModal = (
  {
    title,
    centered = true,
    isFirstPage = false,
    opened,
    setOpened,
    children,
  }: {
    title: string,
    centered?: boolean,
    isFirstPage?: boolean,
    opened?: boolean,
    setOpened?: React.Dispatch<React.SetStateAction<boolean>>,
    children?: React.ReactNode,
  }) => {
  const router = useRouter();
  const [openedInternal, setOpenedInternal] = useState(false);

  // Se non ci sono prop, usiamo lo stato interno
  const openedState = opened ?? openedInternal;
  const setOpenedState = setOpened ?? setOpenedInternal;

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpenedState(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Modal
      opened={openedState}
      onClose={() => setOpenedState(false)}
      title={title}
      centered={centered}
      closeButtonProps={{
        icon: <X size={20} />
      }}
      onExitTransitionEnd={() => isFirstPage ? window.location.replace("/") : router.back()}
    >
      {children}
    </Modal>
  );

};
