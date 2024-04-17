"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader, Paperclip, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SendMessageSchema = z.object({
  author: z.string(),
  text: z.string().optional(),
});

type SendMessageValue = z.infer<typeof SendMessageSchema>;

interface SendMessageFormValue {
  authorId: string | undefined;
  chatId: string | null | undefined;
}

function SendMessageButton({ authorId, chatId }: SendMessageFormValue) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const params = useParams();
  const form = useForm<SendMessageValue>({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      author: authorId,
      text: "",
    },
  });

  //   form.setValue("createdAt", createdAt);
  //   form.setValue("notifications", notifications);

  async function onSubmit(formData: SendMessageValue) {
    try {
      setLoading(true);

      await axios.post(`/api/chats/${chatId}`, formData);

      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-rowborder-t-2 border-slate-300 px-4 py-2 flex flex-row gap-2 justify-between items-center"
      >
        <button className="group p-2 rounded-full hover:bg-slate-300 transition delay-100 duration-300">
          <Paperclip className="group-hover:stroke-blue-500 stroke-slate-700 transition delay-100 duration-300" />
        </button>

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Введите сообщение"
                  className="rounded-xl bg-slate-100 "
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          disabled={loading}
          type="submit"
          className="group p-2 rounded-full hover:bg-slate-300 transition delay-100 duration-300"
        >
          {loading ? (
            <Loader className="w-6 h-6 animate-spin stroke-slate-700" />
          ) : (
            <SendHorizonal className="group-hover:stroke-blue-500 stroke-slate-700 transition delay-100 duration-300 w-6 h-6" />
          )}
        </button>
      </form>
    </Form>
  );
}

export default SendMessageButton;
