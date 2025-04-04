import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { Text } from "@mantine/core";

export default function Client({ jobPosition }: { jobPosition: JobPositionResponseDTO | null }) {
  if (jobPosition === null) return;

  return (
    <>
      <Text>
        {jobPosition.title}
      </Text>
      <Text>
        {jobPosition.description}
      </Text>
    </>
  );
}
