import { z } from "zod";
import {
  contactMessages,
  insertContactMessageSchema,
} from "@shared/schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  contact: {
    create: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertContactMessageSchema
        .extend({
          email: z.string().email(),
          name: z.string().min(2),
          message: z.string().min(10),
        })
        .superRefine((val, ctx) => {
          const trimmedSubject = (val.subject ?? "").trim();
          if (trimmedSubject.length > 0 && trimmedSubject.length < 3) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Subject must be at least 3 characters",
              path: ["subject"],
            });
          }
        }),
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>,
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ContactCreateInput = z.infer<typeof api.contact.create.input>;
export type ContactCreateResponse = z.infer<
  typeof api.contact.create.responses[201]
>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
export type InternalError = z.infer<typeof errorSchemas.internal>;
