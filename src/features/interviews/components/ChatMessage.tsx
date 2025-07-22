import { ActionIcon, Avatar, Box, Button, Card, Flex, Group, Paper, Text } from "@mantine/core";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { MouseEventHandler } from "react";
import { OpenAiLogo, PencilSimple, Robot, Trash } from "@phosphor-icons/react";
import { HireButton } from "@/components/HireButton";

export default function ChatMessage({ text, isUser }: {
  text: string,
  isUser: boolean,
}) {
  return isUser ? (
    <>
      <Paper
        radius="lg"
        p="md"
        className={'self-end max-w-[80%] bg-gray-600'}
        style={{
          backgroundColor: 'var(--mantine-primary-color-light)'
        }}
      >
        <Text>
          {text}
        </Text>
      </Paper>
    </>
  ) : (
    <>
      <Flex gap="md">
        <Avatar size="md" radius="xl">
          <OpenAiLogo size={24} />
        </Avatar>
        <Text>
          {text}
        </Text>
      </Flex>

    </>
  );

}
