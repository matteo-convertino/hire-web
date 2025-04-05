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
    children
  }: {
    title: string,
    centered?: boolean,
    isFirstPage?: boolean,
    children: React.ReactNode
  }) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpened(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
      centered={centered}
      closeButtonProps={{
        icon: <X size={20} />
      }}
      onExitTransitionEnd={() => isFirstPage ? router.replace("/") : router.back()}
    >
      {children}
    </Modal>
  );

};
