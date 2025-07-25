import { Avatar, Flex, Loader, Paper, Text } from "@mantine/core";
import { OpenAiLogo } from "@phosphor-icons/react";

export default function ChatMessage({ text, isUser }: {
  text: string | undefined,
  isUser: boolean,
}) {
  return isUser ? (
    <>
      <Paper
        radius="lg"
        p="md"
        className={"self-end max-w-[80%] bg-gray-600"}
        style={{
          backgroundColor: "var(--mantine-primary-color-light)"
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
          {text ?? <Loader type="dots" color="white" />}
        </Text>
      </Flex>

    </>
  );

}
