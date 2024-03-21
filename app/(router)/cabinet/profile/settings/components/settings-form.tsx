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

const settingsFormSchema = z.object({
  username: z.string().min(2, {
    message: "Логин должен быть не меньше 2 значении",
  }),
  name: z.string().optional(),
  phone: z.string().min(10, {
    message: "Номер должен быть 10 значении",
  }),
  email: z
    .string()
    .min(2, {
      message: "Заполните поле",
    })
    .email("Эта почта не валидна"),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

interface SettingsFormProps {
  initialData: User | null;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      username: initialData?.username,
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      email: initialData?.email,
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(formData: SettingsFormValues) {
    try {
      setLoading(true);
      await axios.patch(`/api/cabinet/profile/settings`, formData);
      setTimeout(() => {
        router.refresh();
        toast({
          title: "Данные успешно изменены",
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
        className="w-full grid grid-cols-3 gap-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="text-slate-800">
              <FormLabel>Ваш логин</FormLabel>
              <FormControl>
                <Input
                  placeholder="user123"
                  className="rounded-xl placeholder:text-slate-300"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Это значение будет отображаться для других пользователей
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-slate-800">
              <FormLabel>Ваше имя</FormLabel>
              <FormControl>
                <Input
                  placeholder="Шоқан Уалиханов"
                  className="rounded-xl placeholder:text-slate-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" text-sm p-2 rounded-xl bg-slate-100 text-slate-800  flex flex-row items-center justify-center gap-2">
          <p className="font-bold">ID:</p>
          <p className="font-semibold text-slate-500">{initialData?.id}</p>
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="text-slate-800 flex flex-col gap-1">
              <FormLabel>Телефон</FormLabel>
              <div className="flex flex-row items-center gap-0.5 text-sm">
                <Image
                  src="/svg/kz.svg"
                  height={48}
                  width={48}
                  alt="kz"
                  className="w-8 rounded-sm mr-1"
                />
                <FormControl>
                  <Input
                    placeholder="+7 (777) 7777777"
                    className="rounded-lg placeholder:text-slate-300 w-36 px-1.5 placeholder:text-sm h-8 "
                    {...field}
                  />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-slate-800 flex flex-col gap-1">
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  placeholder="ert@example.com"
                  className="rounded-xl placeholder:text-slate-300 "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="rounded-xl bg-slate-800  mt-2 col-span-2"
          type="submit"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Сохранить изменения
        </Button>
      </form>
    </Form>
  );
}
