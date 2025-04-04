"use client"

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { Badge, Button, Card, Group, SimpleGrid, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Client({ jobPositions }: { jobPositions: JobPositionResponseDTO[] }) {
  const router = useRouter();

  return (
    <SimpleGrid cols={3}>
      {
        jobPositions.map((jobPosition) =>
          (
            <Card key={jobPosition.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Text fw={500}>{jobPosition.title}</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>

              <Text size="sm" c="dimmed">{jobPosition.description}</Text>

              <Button color="blue"
                      fullWidth
                      mt="md"
                      radius="md"
                      onClick={() => router.push(`/job-positions/${jobPosition.id}`)}>
                See interview
              </Button>
            </Card>
          ))
      }
    </SimpleGrid>

  );
}
