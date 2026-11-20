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
    currentPassword: z.string().min(1, "Укажите текущий пароль"),
    password: z
      .string()
      .min(6, "Пароль должен быть не меньше 6 значении")
      .max(128, "Пароль должен быть не больше 128 значении"),
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
      currentPassword: "",
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
      form.reset();
      setTimeout(() => {
        router.refresh();
        toast({
          title: "Пароль изменен успешно",
        });
      }, 1000);
    } catch (error: any) {
      toast({
        description:
          error?.response?.status === 403
            ? "Текущий пароль указан неверно"
            : "Что-то пошло не так...",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:grid lg:grid lg:grid-cols-2 gap-6 xs:flex xs:flex-col md:grid-cols-2 "
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="text-slate-800 lg:col-span-2 md:col-span-2">
              <FormLabel>Текущий пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
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
