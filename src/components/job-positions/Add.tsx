import { HireModal } from "@/components/hire/HireModal";

export const JobPositionAdd = (
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
