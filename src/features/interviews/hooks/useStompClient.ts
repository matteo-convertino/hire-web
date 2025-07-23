"use client";

import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import { WebSocketRoutes } from "@/utils/routes/webSocketRoutes";
import { ErrorDTO, ErrorDTOSchema } from "@/dto/ErrorDTO";
import { MessageResponseDTO, messageResponseSchema } from "@/dto/response/MessageResponseDTO";
import { MessageRequestDTO } from "@/dto/request/MessageRequestDTO";
import { showHireErrors } from "@/utils/hireNotifications";

export default function useStompClient() {
  const stompClient = useRef<Client>(undefined);

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      brokerURL: process.env.NEXT_PUBLIC_WS_URL,
      reconnectDelay: 1000,
      onStompError: err => {
        console.log("STOMP Error:", err);
      },
      onWebSocketError: err => {
        console.log("WS Error:", err);
      }
    });

    client.onConnect = () => {
      console.log("STOMP Client Connected");
      stompClient.current = client;
      setConnected(true);

      subscribeToErrors({
          callback: ((errorDTO: ErrorDTO) => {
              console.log(`WebSocket error: ${errorDTO.message}`);
              showHireErrors({ errorDTO: errorDTO });
            }
          )
        }
      );
    };

    client.onDisconnect = () => {
      console.log("Successfully disconnected from STOMP client.");
      setConnected(false);
    };

    client.activate();

    return () => {
      client.deactivate();
    };

  }, []);

  const publish = (destination: string, body?: string) => {
    if (!stompClient.current?.connected) return;

    stompClient.current.publish({
      destination: destination,
      headers: {
        "content-type": "application/json"
      },
      body: body
    });
  };

  const publishMessageToInterview = ({ interviewId, message }: { interviewId: number, message: MessageRequestDTO }) =>
    publish(WebSocketRoutes.APP_MESSAGES(interviewId), JSON.stringify(message));


  const subscribe = (destination: string, callback: (message: IMessage) => void) => {
    if (!stompClient.current?.connected) return;

    return stompClient.current.subscribe(destination, callback);
  };

  const subscribeToInterview = ({ interviewId, callback }: {
    interviewId: number,
    callback: (message: MessageResponseDTO) => void
  }) =>
    subscribe(WebSocketRoutes.QUEUE_INTERVIEWS(interviewId), (message) => {
      try {
        const rawData = JSON.parse(message.body);
        if (rawData.statusCodeValue !== 200) return;

        const parsed = messageResponseSchema.safeParse(rawData.body);
        if (parsed.success) callback(parsed.data);
      } catch (_) {
      }
    });

  const subscribeToErrors = ({ callback }: {
    callback: (message: ErrorDTO) => void
  }) =>
    subscribe(WebSocketRoutes.QUEUE_ERRORS, (message) => {
      try {
        const rawData = JSON.parse(message.body);

        const parsed = ErrorDTOSchema.safeParse(rawData.body);
        if (parsed.success) callback(parsed.data);
      } catch (_) {
      }
    });


  return { connected, subscribeToInterview, publishMessageToInterview };
}
