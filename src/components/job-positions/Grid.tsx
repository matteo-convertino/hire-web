import HireJobPositionCard from "@/components/hire/HireJobPositionCard";
import { SimpleGrid } from "@mantine/core";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";

export const JobPositionsGrid = (
  {
    jobPositions = [],
    onView = undefined,
    onEdit = undefined,
    onDelete = undefined
  }: {
    jobPositions: JobPositionResponseDTO[],
    onView?: (id: number) => void
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
  }) => {
  return (
    <SimpleGrid cols={3}>
      {
        jobPositions?.map((jobPosition) =>
          <HireJobPositionCard
            key={jobPosition.id}
            jobPosition={jobPosition}
            onView={onView === undefined ? undefined : () => onView(jobPosition.id)}
            onEdit={onEdit === undefined ? undefined : () => onEdit(jobPosition.id)}
            onDelete={onDelete === undefined ? undefined : () => onDelete?.(jobPosition.id)}
          />
        )
      }
    </SimpleGrid>
  );
};
