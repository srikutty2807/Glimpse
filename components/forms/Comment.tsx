"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Input } from "../ui/input"
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/threadvalidation";
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions/thread.actions";
import Image from "next/image";
interface CommentProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}
function Comment({ threadId, currentUserImg, currentUserId }: CommentProps) {
    const router = useRouter();
    const pathname = usePathname();
    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          thread: "",
        },
      });
      
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId,values.thread,JSON.parse(currentUserId),pathname);

        form.reset()
      }; 
   return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex justify-center items-center gap-3 w-full">
              <FormLabel>
                <Image src={currentUserImg} alt="profile-img-comment" width={48} height={48} className="rounded-full object-cover" />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comments.."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
