import { HireModal } from "@/components/hire/HireModal";

export const Add = (
  {
    isFirstPage = false
  }: {
    isFirstPage?: boolean
  }) => {
  console.log(`Add ${isFirstPage}`);
  return (
    <HireModal title="Nuovo Libro" isFirstPage={isFirstPage}>
      Prova
    </HireModal>
  );

};
