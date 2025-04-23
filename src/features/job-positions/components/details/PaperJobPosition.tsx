import { Button, Paper, Text, Title } from "@mantine/core";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";

export default function PaperJobPosition({ jobPosition, onApply }: {
  jobPosition: JobPositionResponseDTO,
  onApply?: () => void,
}) {

  return (
    <Paper shadow="xs" radius="md" withBorder p="lg">
      <Title>{jobPosition.title}</Title>

      <Text fw={500}>{jobPosition.description}</Text>

      <Button
        disabled={onApply === undefined}
        onClick={onApply}
        radius="md"
        mt="md"
        variant="filled"
        fullWidth
      >
        Apply now
      </Button>
    </Paper>
  );
}
