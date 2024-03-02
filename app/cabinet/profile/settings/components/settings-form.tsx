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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Логин должен быть не меньше 2 значении",
  }),
  phone: z
    .number()
    .min(10, {
      message: "Номер должен быть 10 значении",
    })
    .max(10, {
      message: "Номер должен быть 10 значении",
    }),
  email: z
    .string()
    .min(2, {
      message: "Заполните поле",
    })
    .email("Эта почта не валидна"),
});

export function SettingsForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Данные сохранены",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-6"
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
        <div className=" text-sm p-2 rounded-xl bg-slate-100 text-slate-800  flex flex-row items-center justify-center gap-2">
          <p className="font-bold">ID:</p>
          <p className="font-semibold text-slate-500">ikkg1122</p>
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
                +7
                <FormControl>
                  <Input
                    placeholder="(777) 7777777"
                    className="rounded-lg placeholder:text-slate-300 w-28 px-1.5 placeholder:text-sm h-8 "
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

        <Button type="submit" className="rounded-2xl">
          Сохранить изменения
        </Button>
      </form>
    </Form>
  );
}
