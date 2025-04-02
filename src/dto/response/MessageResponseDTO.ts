import { ChatRole } from "@/utils/ChatRole";

export type MessageResponseDTO = {
    id: number
    text: string
    interviewId: number
    isLastMessage: boolean
    role: ChatRole
}
