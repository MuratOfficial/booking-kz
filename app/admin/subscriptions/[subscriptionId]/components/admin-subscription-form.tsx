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
import {
  CalendarFold,
  CalendarIcon,
  Check,
  CheckCircle2,
  ChevronsUpDown,
  Crown,
  Flame,
  Heart,
  ImagePlus,
  Info,
  Loader2,
  Puzzle,
  Rocket,
  Star,
  ThumbsUpIcon,
  Timer,
  TimerReset,
} from "lucide-react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Subscription } from "@prisma/client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const subscriptionFormSchema = z.object({
  name: z.string({ required_error: "Напишите название" }),
  days: z.coerce.number({ required_error: "Укажите количество дней" }).int(),
  price: z.coerce.number({ required_error: "Укажите стоимость" }).int(),
  color: z.string({ required_error: "Нужно выбрать цвет" }),
  icon: z.string({ required_error: "Выберите иконку" }),

  description: z.string().max(360, "Не Должно превышать 360 знаков"),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

interface AdminSubscriptionFormProps {
  initialData: Subscription | null;
}

function AdminSubscriptionForm({ initialData }: AdminSubscriptionFormProps) {
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      price: initialData?.price || 0,
      name: initialData?.name || "",

      days: initialData?.days || 0,
      color: initialData?.color || "16a34a",
      icon: initialData?.icon || "1",

      description: initialData?.description || "",
    },
  });

  // const { fields, append } = useFieldArray({
  //   name: "additionalFilter",
  //   control: form.control,
  // });
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(formData: SubscriptionFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/admin/subscriptions/${params.subscriptionId}`,
          formData
        );
      } else {
        await axios.post(`/api/admin/subscriptions`, formData);
      }
      router.refresh();
      router.push(`/admin/subscriptions`);
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

  const [color, setColor] = React.useState("");

  const icons = [
    {
      value: "1",
      icon: <Crown className="w-6" />,
    },
    {
      value: "2",
      icon: <Flame className="w-6" />,
    },
    {
      value: "3",
      icon: <CheckCircle2 className="w-6" />,
    },
    {
      value: "4",
      icon: <Rocket className="w-6" />,
    },
    {
      value: "5",
      icon: <ThumbsUpIcon className="w-6" />,
    },
    {
      value: "6",
      icon: <Star className="w-6" />,
    },
    {
      value: "7",
      icon: <Heart className="w-6" />,
    },
  ];

  const colors = [
    "22c55e",
    "06b6d4",
    "3b82f6",
    "8b5cf6",
    "ec4899",
    "f59e0b",
    "78716c",
    "0f172a",
  ];

  return (
    <div className="w-full flex flex-col gap-2 text-slate-900 py-4 pl-4 pr-6">
      <h1 className="text-2xl font-semibold ml-4">
        {initialData ? `Продвижение ID ${initialData.id}` : "Новое продвижение"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="w-full grid grid-cols-4 gap-6 bg-white px-6 py-4 rounded-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-slate-800 col-span-2">
                  <FormLabel className=" text-base font-semibold">
                    Название продвижения
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Продвижение на 30 дней..."
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
              name="days"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Количество дней</p>
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <div className="flex flex-row gap-x-2 items-center relative w-fit">
                        <Input
                          className="w-44"
                          type="number"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <p className="absolute right-2 text-sm font-medium text-slate-600">
                          дней
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
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Стоимость</p>
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <div className="flex flex-row gap-x-2 items-center relative w-fit">
                        <Input
                          className="w-44"
                          type="number"
                          value={field.value}
                          onChange={field.onChange}
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
          </div>

          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 py-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <p className="text-base font-semibold">Описание</p>
                  <FormControl>
                    <Textarea
                      placeholder="Макс. 260 знаков"
                      className="resize-none min-h-[6rem]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-6 bg-white rounded-xl px-6 py-4">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <p className="text-base font-semibold">Иконка</p>
                  <FormControl>
                    <ToggleGroup
                      className="flex flex-row gap-2 flex-wrap"
                      type="single"
                      defaultValue={field.value}
                    >
                      {icons.map((el, ind) => (
                        <ToggleGroupItem
                          key={ind}
                          value={el.value}
                          className="text-sm h-12 border w-12"
                          onClick={() => form.setValue("icon", el.value)}
                        >
                          {el.icon}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <p className="text-base font-semibold">Цвет</p>
                  <FormControl>
                    <ToggleGroup
                      className="flex flex-row flex-wrap gap-2"
                      type="single"
                      defaultValue={field.value}
                    >
                      {colors.map((el, ind) => (
                        <ToggleGroupItem
                          key={ind}
                          value={el}
                          className={cn(
                            `text-sm h-12 border w-12 items-center`
                          )}
                          onClick={() => form.setValue("color", el)}
                        >
                          <span
                            style={{ backgroundColor: `#${el}` }}
                            className="rounded-md w-6 h-6"
                          ></span>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>

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
            {initialData ? "Сохранить изменения" : "Создать продвижение"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminSubscriptionForm;
