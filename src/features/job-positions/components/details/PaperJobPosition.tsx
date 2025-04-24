import { Button, Paper, Text, Title } from "@mantine/core";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { HireButton } from "@/components/HireButton";

export default function PaperJobPosition({ jobPosition, onApply }: {
  jobPosition: JobPositionResponseDTO,
  onApply?: () => void,
}) {

  return (
    <Paper shadow="xs" radius="md" withBorder p="lg">
      <Title>{jobPosition.title}</Title>

      <Text fw={500}>{jobPosition.description}</Text>

      <HireButton
        label="Apply now"
        disabled={onApply === undefined}
        onClick={onApply}
        mt="md"
        fullWidth
      />
    </Paper>
  );
}
