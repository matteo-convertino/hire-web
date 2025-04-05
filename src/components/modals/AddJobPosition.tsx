"use client";

import { HireModal } from "@/components/hire/HireModal";

export const AddJobPosition = (
  {
    isFirstPage = false
  }: {
    isFirstPage?: boolean
  }) => {
  return (
    <HireModal title="Nuovo Libro" isFirstPage={isFirstPage}>
      Prova
    </HireModal>
  );

};
