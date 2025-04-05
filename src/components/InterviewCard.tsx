import { Button, Card, Group, Text } from "@mantine/core";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { MouseEventHandler } from "react";

export default function InterviewCard({ jobPosition, onClick }: {
  jobPosition: JobPositionResponseDTO,
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{jobPosition.title}</Text>
      </Group>

      <Text size="sm" c="dimmed">{jobPosition.description}</Text>

      <Button color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={onClick}>
        See job position
      </Button>
    </Card>
  );
}
