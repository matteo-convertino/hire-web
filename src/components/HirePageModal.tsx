"use client";

import { MantineSize } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HireModal } from "@/components/HireModal";

export const HirePageModal = (
  {
    title,
    centered = true,
    size = "md",
    isFirstPage = false,
    opened,
    setOpened,
    beforeClose,
    children
  }: {
    title: string,
    centered?: boolean,
    size?: MantineSize
    isFirstPage?: boolean,
    opened?: boolean,
    setOpened?: React.Dispatch<React.SetStateAction<boolean>>,
    beforeClose?: () => void,
    children?: React.ReactNode,
  }) => {
  const router = useRouter();
  const [openedInternal, setOpenedInternal] = useState(false);

  // If it is not managed by parent, we manage it internally
  const openedState = opened ?? openedInternal;
  const setOpenedState = setOpened ?? setOpenedInternal;

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpenedState(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    beforeClose?.();
    setOpenedState(false);
  };

  return (
    <HireModal
      opened={openedState}
      onClose={handleClose}
      title={title}
      centered={centered}
      size={size}
      onExitTransitionEnd={() => isFirstPage ? window.location.replace("/") : router.back()}
    >
      {children}
    </HireModal>
  );

};
