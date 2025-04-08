"use client";

import { Modal } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);

  console.log(isFirstPage);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpened(true));
    console.log(id);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Modal
      key={pathname}
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title={title}
      centered={centered}
      closeButtonProps={{
        icon: <X size={20} />
      }}
      onExitTransitionEnd={() => {
        // isFirstPage ? router.replace("/") : router.back();

        router.push("/");
        // router.back();

        // router.push("/");
        // console.log("Back to");
        // console.log(isFirstPage);
      }}
    >
      {children}
    </Modal>
  );

};
