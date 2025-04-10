import { ActionIcon, Button, Card, Flex, Group, Text } from "@mantine/core";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { MouseEventHandler } from "react";
import { PencilSimple, Trash } from "@phosphor-icons/react";

export default function JobPositionCard({ jobPosition, onView, onEdit, onDelete }: {
  jobPosition: JobPositionResponseDTO,
  onView?: MouseEventHandler<HTMLButtonElement> | undefined
  onEdit?: MouseEventHandler<HTMLButtonElement> | undefined
  onDelete?: MouseEventHandler<HTMLButtonElement> | undefined
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{jobPosition.title}</Text>
      </Group>

      <Text size="sm" c="dimmed">{jobPosition.description}</Text>

      <Flex gap="xs" align="center" mt="md">
        <Button color="blue"
                style={{ flex: 1 }}
                fullWidth
                radius="md"
                onClick={onView}>
          See job position
        </Button>
        {
          onEdit &&
          <ActionIcon variant="filled" onClick={onEdit}  size="lg" radius="md">
            <PencilSimple />
          </ActionIcon>
        }
        {
          onDelete &&
          <ActionIcon variant="filled" color="red" onClick={onDelete} size="lg" radius="md">
            <Trash />
          </ActionIcon>
        }
      </Flex>

    </Card>
  );
}
