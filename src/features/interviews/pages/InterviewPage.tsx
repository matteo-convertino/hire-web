"use client";

import { ErrorDTO } from "@/dto/ErrorDTO";
import { useHireClientSideErrorHandler } from "@/hooks/useHireClientSideErrorHandler";
import { ActionIcon, Box, Container, Flex, ScrollArea, Text, TextInput } from "@mantine/core";
import { notFound, useRouter } from "next/navigation";
import { InterviewResponseDTO } from "@/dto/response/InterviewResponseDTO";
import { MessageResponseDTO } from "@/dto/response/MessageResponseDTO";
import { PaperPlane } from "@phosphor-icons/react";
import ChatMessage from "@/features/interviews/components/ChatMessage";
import useInterviewMessages from "@/features/interviews/hooks/useInterviewMessages";
import { useEffect, useRef, useState } from "react";
import { HireButton } from "@/components/HireButton";

export default function InterviewPage({ interview, error, initialMessages }: {
  interview?: InterviewResponseDTO,
  initialMessages: MessageResponseDTO[],
  error?: ErrorDTO,
}) {
  if (interview === undefined) notFound();

  useHireClientSideErrorHandler(error);

  const router = useRouter();

  const [interviewCompleted, setInterviewCompleted] = useState(interview.completedAt !== null);
  const { messages, form, onSubmit } = useInterviewMessages({
    interviewId: interview.id,
    initialMessages: initialMessages,
    onLastMessage: () => setInterviewCompleted(true)
  });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Container h="100%">
        <Flex direction="column" h={messages.length === 0 ? "50%" : "100%"}>
          <ScrollArea className={"flex-1"}>
            <Flex direction="column" gap="xl">
              {messages.map((message: MessageResponseDTO, index) => {
                return <ChatMessage key={index} isUser={message.role === "USER"} text={message.text} />;
              })}
            </Flex>
            <Box ref={messagesEndRef}></Box>
          </ScrollArea>

          {messages.length === 0 &&
            <>
              <Text size="xl" fw="bold" ta="center">
                Welcome to your interview!
              </Text>
              <Text size="sm" ta="center">
                When you feel ready click the button to send your first message and start your interview.
              </Text>
              <Text size="sm" ta="center" mb="lg">
                The interview will end automatically when we feel we have enough information.
              </Text>
            </>
          }

          {
            interviewCompleted ?
              <HireButton
                label="Back to dashboard"
                mt="sm"
                onClick={() => router.replace("/dashboard")}
              />
              :
              <form className={"sticky bottom-2"} onSubmit={form.onSubmit(onSubmit)}>
                <TextInput
                  placeholder="Write here your answer..."
                  mt="sm"
                  size="md"
                  radius="md"
                  disabled={messages.length === 0}
                  rightSection={
                    <ActionIcon
                      variant="filled"
                      size="lg"
                      radius="md"
                      type="submit"
                    >
                      <PaperPlane />
                    </ActionIcon>
                  }
                  key={form.key("text")}
                  {...form.getInputProps("text")}
                />
              </form>
          }

        </Flex>
      </Container>
    </>
  );
}
