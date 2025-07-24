import { Box, Card, Divider, Group, Text } from "@mantine/core";

export default function ReportCard({ interviewId, value }: {
  interviewId: string,
  value: { userId: number, skills: Record<string, number> }
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Box>
          <Text size="sm" span>Interview ID: </Text>
          <Text size="lg" span>{interviewId}</Text>
        </Box>
        <Box>
          <Text size="sm" span>User ID: </Text>
          <Text size="lg" span>{value.userId}</Text>
        </Box>
      </Group>


      {Object.entries(value.skills).map(([description, value]) => (
        <Box key={description}>
          <Divider my="md"></Divider>
          <Group justify="space-between">
            <Text size="sm" className="w-100">{description}</Text>
            <Text size="lg">{value}</Text>
          </Group>
        </Box>
      ))}
    </Card>
  );
}
