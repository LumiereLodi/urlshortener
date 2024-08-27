import { z } from "zod";

export const payloadSchema = z.object({
  url: z.string().min(1),
});

export type Payload = z.infer<typeof payloadSchema>
