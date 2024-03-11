import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().min(1).min(3, { message: "minimum 3 characters" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().min(1).min(3, { message: "minimum 3 characters" }),
});
