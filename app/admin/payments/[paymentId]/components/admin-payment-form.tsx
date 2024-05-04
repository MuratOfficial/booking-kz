"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

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
import { toast } from "@/components/ui/use-toast";
import { Check, ChevronsUpDown, Info, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import { Building, Payment, Refill, Subscription, User } from "@prisma/client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const paymentFormSchema = z.object({
  userId: z.string({ required_error: "Выберите пользователя" }),
  sum: z
    .string({ required_error: "Укажите сумму" })
    .max(32, "Слишком большая сумма"),
  bonus: z.string().max(32, "Слишком большой бонус").optional(),
  status: z.string({ required_error: "Выберите статус" }),
  annoncementId: z.string().optional(),
  paymentUrl: z.string().optional(),
  transactionId: z.string().optional(),
  transactionType: z.string({ required_error: "Выберите тип транз." }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface AdminPaymentFormProps {
  initialData: Payment | null;
  users: User[];
  refills?: Refill[] | [] | null;
  subscriptions?: Subscription[] | [] | null;
}

function AdminPaymentForm({
  initialData,
  users,
  refills,
  subscriptions,
}: AdminPaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      userId: initialData?.userId,
      sum: initialData?.sum || "0",
      bonus: initialData?.bonus || "0",
      status: initialData?.status || "pending",
      annoncementId: initialData?.annoncementId || "",
      paymentUrl: initialData?.paymentUrl || "",
      transactionId: initialData?.transactionId || "",
      transactionType: initialData?.transactionType,
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);
  const [transType, setTransType] = React.useState(
    (initialData && initialData.transactionType) || ""
  );
  const [refill, setRefill] = React.useState<Refill | null>();
  const [subs, setSubs] = React.useState<Subscription | null>();

  async function onSubmit(formData: PaymentFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/admin/payments/${params.paymentId}`, formData);
      } else {
        await axios.post(`/api/admin/payments`, formData);
      }
      if (formData.status === "success") {
        await axios.patch(
          `/api/admin/users/${formData.userId}/balance`,
          formData
        );
      }

      router.refresh();
      router.push(`/admin/payments`);
      toast({
        title: "Данные отправлены успешно",
      });
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const services = [
    {
      value: "refill",
      label: "Пополнение",
    },
    {
      value: "refill-manual",
      label: "Пополнение (вручную)",
    },
    {
      value: "modifier",
      label: "Модификаторы",
    },
    {
      value: "subscription",
      label: "Подписка",
    },
    {
      value: "bonus",
      label: "Бонус",
    },
  ];

  const statuses = [
    {
      value: "success",
      label: "Успешно",
    },
    {
      value: "cancel",
      label: "Отмена",
    },
    {
      value: "fail",
      label: "Ошибка",
    },
    {
      value: "pending",
      label: "В процессе",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2 text-slate-900 py-4 pl-4 pr-6">
      <h1 className="text-2xl font-semibold ml-4">
        {initialData ? `Платеж ${initialData.id}` : "Новый Платеж"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="w-full grid grid-cols-4 gap-4 bg-white px-6 py-4 rounded-xl">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <p className="text-base font-semibold">Пользователь</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? users.find((user) => user.id === field.value)
                              ?.username
                          : "Выберите пользователя"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandInput placeholder="Искать польз..." />
                        <CommandEmpty>Не найдено польз.</CommandEmpty>
                        <CommandGroup>
                          {users?.map((user) => (
                            <CommandItem
                              value={user.id}
                              key={user.id}
                              onSelect={() => {
                                form.setValue("userId", user.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  user.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {user.username}
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
              name="transactionType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <p className="text-base font-semibold">Тип транзакции</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          services.find(
                            (service) => service.value === field.value
                          )?.label
                        ) : (
                          <span className="line-clamp-1">
                            Выберите тип постройки
                          </span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandGroup>
                          {services.map((service) => (
                            <CommandItem
                              value={service.label}
                              key={service.value}
                              onSelect={() => {
                                form.setValue("transactionType", service.value);
                                setTransType(service.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  service.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {service.label}
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
            {transType === "refill-manual" && (
              <>
                <FormField
                  control={form.control}
                  name="sum"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <p className="text-base font-semibold">Сумма</p>
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <div className="flex flex-row gap-x-2 items-center relative w-full">
                            <Input
                              className="w-full font-medium"
                              type="number"
                              {...field}
                            />
                            <p className="absolute right-2 text-sm font-medium text-slate-600">
                              ₸
                            </p>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bonus"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <p className="text-base font-semibold">Бонус</p>
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <div className="flex flex-row gap-x-2 items-center relative w-full">
                            <Input
                              className="w-full font-medium"
                              type="number"
                              {...field}
                            />
                            <p className="absolute right-2 text-sm font-medium text-slate-600">
                              б
                            </p>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {transType === "refill" && (
              <>
                <div className="flex flex-col gap-2 items-start">
                  <p className="text-base font-semibold">Вид пополнения</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !refill && "text-muted-foreground"
                        )}
                      >
                        {refill
                          ? refills?.find((item) => item.id === refill?.id)
                              ?.total
                          : "Выберите пополнение"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandInput placeholder="Искать пополнение..." />
                        <CommandEmpty>Не найдено.</CommandEmpty>
                        <CommandGroup>
                          {refills?.map((item) => (
                            <CommandItem
                              value={item.id}
                              key={item.id}
                              onSelect={() => {
                                setRefill(item);
                                form.setValue("sum", item.total.toString());
                                form.setValue("bonus", item.bonus?.toString());
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  item.id === refill?.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item?.total}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <FormField
                  control={form.control}
                  name="sum"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <p className="text-base font-semibold">Сумма</p>
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <div className="flex flex-row gap-x-2 items-center relative w-full">
                            <Input
                              className="w-full font-medium"
                              type="number"
                              value={refill?.total.toString()}
                              disabled
                            />
                            <p className="absolute right-2 text-sm font-medium text-slate-600">
                              ₸
                            </p>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bonus"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <p className="text-base font-semibold">Бонус</p>
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <div className="flex flex-row gap-x-2 items-center relative w-full">
                            <Input
                              className="w-full font-medium"
                              type="number"
                              value={refill?.bonus?.toString() || ""}
                              disabled
                            />
                            <p className="absolute right-2 text-sm font-medium text-slate-600">
                              б
                            </p>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {transType === "bonus" && (
              <FormField
                control={form.control}
                name="bonus"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <p className="text-base font-semibold">Бонус</p>
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <div className="flex flex-row gap-x-2 items-center relative w-full">
                          <Input
                            className="w-full font-medium"
                            type="number"
                            {...field}
                          />
                          <p className="absolute right-2 text-sm font-medium text-slate-600">
                            б
                          </p>
                        </div>
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {transType === "subscription" && (
              <>
                <div className="flex flex-col gap-2 items-start">
                  <p className="text-base font-semibold">Вид подписки</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !subs && "text-muted-foreground"
                        )}
                      >
                        {subs
                          ? subscriptions?.find((item) => item.id === subs?.id)
                              ?.name
                          : "Выберите подписки"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandInput placeholder="Искать пополнение..." />
                        <CommandEmpty>Не найдено.</CommandEmpty>
                        <CommandGroup>
                          {subscriptions?.map((item) => (
                            <CommandItem
                              value={item.id}
                              key={item.id}
                              onSelect={() => {
                                setSubs(item);
                                form.setValue("sum", item.price.toString());
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  item.id === subs?.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item?.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <FormField
                  control={form.control}
                  name="sum"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <p className="text-base font-semibold">Сумма</p>
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <div className="flex flex-row gap-x-2 items-center relative w-full">
                            <Input
                              className="w-full font-medium"
                              type="number"
                              value={subs?.price.toString()}
                              disabled
                            />
                            <p className="absolute right-2 text-sm font-medium text-slate-600">
                              ₸
                            </p>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="annoncementId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col col-span-2">
                      <p className="text-base font-semibold">ID обьявления</p>
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Input
                            className="w-full font-medium"
                            placeholder="ifgd-sdju-48ff-loiigoig"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                      <FormDescription>
                        Укажите ID обьявления если потребуется. Поле не
                        обьязательное
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <div className="w-full grid grid-cols-3 gap-4 bg-white px-6 py-4 rounded-xl">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <p className="text-base font-semibold">Статус</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          statuses.find(
                            (status) => status.value === field.value
                          )?.label
                        ) : (
                          <span className="line-clamp-1">Выберите статус</span>
                        )}
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
                  <FormDescription>Выберите статус платежа</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">ID транзакций</p>
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <Input
                        className="w-full font-medium"
                        placeholder="44889558899778"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                  <FormDescription>
                    Укажите ID транзакции эквайринга. Поле не обьязательное
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Ссылка на оплату</p>
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <Input
                        className="w-full font-medium"
                        placeholder="https://payment-page.onevisionpay..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                  <FormDescription>
                    Укажите ссылку на оплату в кабинете Onevision
                  </FormDescription>
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
            {initialData ? "Сохранить изменения" : "Создать новый платеж"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminPaymentForm;
