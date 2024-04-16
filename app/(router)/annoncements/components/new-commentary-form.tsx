"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

const commentaryFormSchema = z.object({
  userId: z.string(),
  comment: z.string().optional(),
  ranking: z.object({
    overall: z.string(),
    ranking1: z.string({ required_error: "Поставьте оценку" }),
    ranking2: z.string({ required_error: "Поставьте оценку" }),
    ranking3: z.string({ required_error: "Поставьте оценку" }),
    ranking4: z.string({ required_error: "Поставьте оценку" }),
    ranking5: z.string({ required_error: "Поставьте оценку" }),
    ranking6: z.string({ required_error: "Поставьте оценку" }),
  }),
});

type NewCommentaryFormValues = z.infer<typeof commentaryFormSchema>;

interface NewCommentaryFormProps {
  userId?: string | null;
  setOpen: (type: boolean) => void;
}

export function NewCommentaryForm({ userId, setOpen }: NewCommentaryFormProps) {
  const { toast } = useToast();
  const form = useForm<NewCommentaryFormValues>({
    resolver: zodResolver(commentaryFormSchema),
    defaultValues: {
      userId: userId || "",
      ranking: {
        overall: "0",
        ranking1: "0",
        ranking2: "0",
        ranking3: "0",
        ranking4: "0",
        ranking5: "0",
        ranking6: "0",
      },
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(formData: NewCommentaryFormValues) {
    try {
      setLoading(true);
      await axios.patch(
        `/api/annoncements/${params.annoncementId}/commentary`,
        formData
      );
      setOpen(false);
      setTimeout(() => {
        router.refresh();
        toast({
          title: "Ваш комментарий был отправлен",
        });
      }, 1000);
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-3 gap-4 text-slate-800"
      >
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="resize-none min-h-[6rem]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="rounded-xl bg-slate-800  mt-2 col-span-3"
          type="submit"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Отправить комментарий
        </Button>
      </form>
    </Form>
  );
}
