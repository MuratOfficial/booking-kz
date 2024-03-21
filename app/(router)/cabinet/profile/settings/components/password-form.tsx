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
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Loader2 } from "lucide-react";

const FormSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Пароли должны совпадать!",
      path: ["confirmPassword"],
    }
  );

export function PasswordForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      await axios.patch(`/api/cabinet/profile/settings/password`, data);
      setTimeout(() => {
        router.refresh();
        toast({
          title: "Пароль изменен успешно",
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
        className="w-full grid grid-cols-2 gap-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="text-slate-800">
              <FormLabel>Новый пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="rounded-xl placeholder:text-slate-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="text-slate-800">
              <FormLabel>Подтвердить пароль</FormLabel>

              <FormControl>
                <Input
                  className="rounded-xl placeholder:text-slate-300"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="rounded-xl " type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Изменить пароль
        </Button>
      </form>
    </Form>
  );
}
