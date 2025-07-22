import { z } from "zod";

export const ChatRoleEnum = z.enum(["USER", "MODEL"]);

export type ChatRole = z.infer<typeof ChatRoleEnum>;
