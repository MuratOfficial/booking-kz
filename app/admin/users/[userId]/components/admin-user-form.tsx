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
import { Check, ChevronsUpDown, Loader2, Puzzle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const userFormSchema = z.object({
  username: z.string({ required_error: "Заполните логин" }).min(2, {
    message: "Логин должен быть не меньше 2 значении",
  }),
  name: z
    .string()
    .min(2, {
      message: "Имя должно быть не меньше 2 значении",
    })
    .optional(),
  phone: z
    .string()
    .refine((data) => /^\+?\d+$/.test(data), {
      message: "Укажите правильный номер телефона",
    })
    .optional(),
  email: z
    .string({ required_error: "Укажите почту" })
    .min(2, {
      message: "Заполните поле",
    })
    .email("Эта почта не валидна"),
  password: z
    .string({ required_error: "Укажите пароль" })
    .min(4, "Значение не должно быть меньше 4"),
  accessType: z
    .string({ required_error: "Выберите тип доступа" })
    .default("user"),
  status: z.string({ required_error: "Выберите статус" }).default("active"),
  totalBalance: z.string().optional(),
  bonusBalance: z.string().optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface AdminUserFormProps {
  initialData: User | null;
}

export function AdminUserForm({ initialData }: AdminUserFormProps) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: initialData?.username || "",
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      password: initialData?.password || "",
      accessType: initialData?.accessType || "user",
      status: initialData?.status || "active",
      totalBalance: initialData?.totalBalance || "0",
      bonusBalance: initialData?.bonusBalance || "0",
    },
  });

  const currentDataAndTime = new Date();
  const router = useRouter();
  const params = useParams();

  async function onSubmit(formData: UserFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/admin/users/${params.userId}`, formData);
      } else {
        await axios.post(`/api/admin/users`, formData);
      }
      router.refresh();
      router.push(`/admin/users`);
      toast({
        title: "Вы отправили следующие данные:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(formData, null, 2)}
            </code>
          </pre>
        ),
      });
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const statuses = [
    { label: "Активный", value: "active" },
    { label: "Заблокирован", value: "blocked" },
  ];

  const accessTypes = [
    { label: "Администратор", value: "admin" },
    { label: "Пользователь", value: "user" },
    { label: "Модератор", value: "moderator" },
  ];

  return (
    <div className="w-full flex flex-col gap-2 text-slate-900 py-4 pl-4 pr-6">
      <h1 className="text-2xl font-semibold ml-4">
        {initialData
          ? `Пользователь ID ${initialData.id}`
          : "Новый пользователь"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col gap-6 w-full flex"
        >
          <div className="w-full grid grid-cols-3 gap-6 ">
            <div className="col-span-2 gap-4 grid-cols-2 grid bg-white rounded-xl py-4 px-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="text-slate-800">
                    <FormLabel className=" text-base font-semibold">
                      Логин пользователя
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="user123"
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
                name="name"
                render={({ field }) => (
                  <FormItem className="text-slate-800">
                    <FormLabel className=" text-base font-semibold">
                      Имя пользователя
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Максутов Максут"
                        className="rounded-xl placeholder:text-slate-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex text-slate-50 flex-col items-center justify-between py-4 px-6 rounded-xl bg-slate-800">
              <div className="flex flex-col  items-center text-sm">
                <p className="font-semibold">Дата и время создания</p>
                <p suppressHydrationWarning>
                  {initialData?.createdAt.toLocaleDateString() ||
                    currentDataAndTime.toLocaleDateString()}{" "}
                  {initialData?.createdAt.toLocaleTimeString() ||
                    currentDataAndTime.toLocaleTimeString()}
                </p>
              </div>
              <div className="flex flex-col  items-center text-sm">
                <p className="font-semibold">
                  Дата и время последнего изменения
                </p>
                <p>
                  {initialData?.updatedAt.toLocaleDateString() || "-"}{" "}
                  {initialData?.updatedAt.toLocaleTimeString() || "-"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 bg-white rounded-xl py-4 px-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-slate-800 flex flex-col gap-1">
                  <FormLabel className="font-semibold text-base">
                    Email
                  </FormLabel>

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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="text-slate-800 flex flex-col gap-1">
                  <FormLabel className="font-semibold text-base">
                    Телефон
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="+77777777777"
                      className="rounded-xl placeholder:text-slate-300 "
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
                <FormItem className="text-slate-800 flex flex-col gap-1">
                  <FormLabel className="font-semibold text-base">
                    Пароль
                  </FormLabel>

                  <FormControl>
                    <Input
                      className="rounded-xl placeholder:text-slate-300 "
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col  bg-emerald-700 rounded-xl py-4 px-6">
            <p className="font-semibold leading-3 text-xs text-neutral-200 flex flex-row gap-x-1 items-center">
              <Puzzle className="w-3" />
              Панель модератора
            </p>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <p className="text-base font-semibold text-neutral-50">
                      Статус
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[280px] justify-between text-slate-900 capitalize",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? statuses.find(
                                (status) => status.value === field.value
                              )?.label
                            : "Выберите статус"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandGroup>
                            {statuses.map((status) => (
                              <CommandItem
                                value={status.label}
                                key={status.value}
                                className=" capitalize"
                                onSelect={() => {
                                  form.setValue("status", status.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    status.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {status.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalBalance"
                render={({ field }) => (
                  <FormItem className="text-slate-800 flex flex-col ">
                    <FormLabel className="font-semibold text-base text-neutral-50">
                      Общий баланс
                    </FormLabel>
                    <div className=" flex flex-row relative">
                      <FormControl>
                        <Input
                          className=" placeholder:text-slate-300 "
                          {...field}
                        />
                      </FormControl>
                      <p className=" absolute right-3 top-3 text-sm font-medium text-neutral-500">
                        ед.
                      </p>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bonusBalance"
                render={({ field }) => (
                  <FormItem className="text-slate-800 flex flex-col ">
                    <FormLabel className="font-semibold text-base text-neutral-50">
                      Бонусный баланс
                    </FormLabel>
                    <div className=" flex flex-row relative">
                      <FormControl>
                        <Input
                          className=" placeholder:text-slate-300 "
                          {...field}
                        />
                      </FormControl>
                      <p className=" absolute right-3 top-3 text-sm font-medium text-neutral-500">
                        ед.
                      </p>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 ">
            <FormField
              control={form.control}
              name="accessType"
              render={({ field }) => (
                <FormItem className="flex flex-col py-4 px-6 rounded-xl border-2 border-slate-900">
                  <p className="text-base font-semibold ">Доступ</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[280px] justify-between text-slate-900 capitalize",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? accessTypes.find(
                              (status) => status.value === field.value
                            )?.label
                          : "Выберите доступ"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandGroup>
                          {accessTypes.map((status) => (
                            <CommandItem
                              value={status.label}
                              key={status.value}
                              className=" capitalize"
                              onSelect={() => {
                                form.setValue("accessType", status.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  status.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {status.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="rounded-xl bg-slate-900  mt-2"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Обновить пользователя" : "Создать пользователя"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
