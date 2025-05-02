"use client";

import { Center, Stack, Text } from "@mantine/core";
import { Player } from "@lottiefiles/react-lottie-player";

export default function NotFound() {
  return (
    <Center h="100%">
      <Stack align="center">
        <Player
          autoplay
          loop
          src="/lottie/not-found.json"
          // style={{ height: '300px', width: '300px' }}
        />
        <Text fw={600}>Interview not found</Text>
      </Stack>
    </Center>
  );
}
