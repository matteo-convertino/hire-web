import { z } from "zod";

export const ErrorDTOSchema = z.object({
  timestamp: z.string().transform((val) => new Date(val)),
  status: z.number(),
  error: z.string(),
  path: z.string(),
  message: z.union([
    z.string(),
    z.record(z.string()),
    z.record(z.array(z.string()))
  ])
});

export type ErrorDTO = z.infer<typeof ErrorDTOSchema>;
