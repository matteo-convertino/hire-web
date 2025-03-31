import { Role } from "@/utils/Role";

export type UserResponseDTO = {
  id: number
  email: string
  name: string
  surname: string
  role: Role
}
