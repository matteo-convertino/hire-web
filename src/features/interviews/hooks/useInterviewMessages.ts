"use client";

import useStompClient from "@/features/interviews/hooks/useStompClient";
import { useEffect, useState } from "react";
import { MessageResponseDTO } from "@/dto/response/MessageResponseDTO";
import { useForm, zodResolver } from "@mantine/form";
import { MessageRequestDTO, messageRequestSchema } from "@/dto/request/MessageRequestDTO";
import { ChatRoleEnum } from "@/utils/ChatRole";

export default function useInterviewMessages({ interviewId, initialMessages, onLastMessage }: {
  interviewId: number,
  initialMessages: MessageResponseDTO[],
  onLastMessage: () => void,
}) {
  const form = useForm<MessageRequestDTO>({
    mode: "uncontrolled",
    validate: zodResolver(messageRequestSchema),
    initialValues: {
      text: initialMessages.length === 0 ? "Let's start the interview" : ""
    }
  });

  const { connected, subscribeToInterview, publishMessageToInterview } = useStompClient();
  const [messages, setMessages] = useState<MessageResponseDTO[]>(initialMessages);

  useEffect(() => {
    if (!connected) return;

    subscribeToInterview({
      interviewId: interviewId,
      callback: (message: MessageResponseDTO) =>
        setMessages((prevMessages) => {
          message.id = prevMessages.at(-1)!.id + 1;

          if(message.lastMessage) onLastMessage();

          return [...prevMessages, message];
        })
    });
  }, [connected]);

  const onSubmit = (messageRequestDTO: MessageRequestDTO) => {
    publishMessageToInterview({
      interviewId: interviewId,
      message: messageRequestDTO
    });

    form.setValues({text: ""});

    setMessages((prevMessages) => {
      const newMessage = {
        id: prevMessages.length === 0 ? 0 : prevMessages.at(-1)!.id + 1,
        text: messageRequestDTO.text,
        interviewId: interviewId,
        lastMessage: false,
        role: ChatRoleEnum.enum.USER
      };

      return [...prevMessages, newMessage];
    });
  };

  return { messages, form, onSubmit };
}

