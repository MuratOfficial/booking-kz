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
import { ModifierType, Subscription } from "@prisma/client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const modifierFormSchema = z.object({
  name: z.string({ required_error: "Напишите название" }),
  price: z.string({ required_error: "Укажите стоимость" }),
  day1: z.coerce.number().int().optional(),
  price2: z.string({ required_error: "Укажите стоимость" }),
  day2: z.coerce.number().int().optional(),
  price3: z.string({ required_error: "Укажите стоимость" }),
  day3: z.coerce.number().int().optional(),

  description: z.string().max(360, "Не Должно превышать 360 знаков").optional(),
});

type ModifierFormValues = z.infer<typeof modifierFormSchema>;

interface AdminModifierFormProps {
  initialData: ModifierType | null;
}

function AdminModifierForm({ initialData }: AdminModifierFormProps) {
  const form = useForm<ModifierFormValues>({
    resolver: zodResolver(modifierFormSchema),
    defaultValues: {
      price: initialData?.modifierPrice || "0",
      name: initialData?.modifier || "",
      day1: initialData?.modifierDays || 0,
      day2: initialData?.modifierDays2 || 0,
      day3: initialData?.modifierDays3 || 0,
      price2: initialData?.modifierPrice2 || "",
      price3: initialData?.modifierPrice3 || "",
      description: initialData?.modifierDesc || "",
    },
  });

  // const { fields, append } = useFieldArray({
  //   name: "additionalFilter",
  //   control: form.control,
  // });
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(formData: ModifierFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/admin/modifiers/${params.modiferId}`, formData);
      } else {
        await axios.post(`/api/admin/modifiers`, formData);
      }
      router.refresh();
      router.push(`/admin/subscriptions/modifiers`);
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

  return (
    <div className="w-full flex flex-col gap-2 text-slate-900 py-4 pl-4 pr-6">
      <h1 className="text-2xl font-semibold ml-4">
        {initialData
          ? `Модификатор "${initialData.modifier}"`
          : "Новый модификатор"}
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
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Стоимость 1</p>
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
            <FormField
              control={form.control}
              name="day1"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Количество дней 1</p>
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
            <FormField
              control={form.control}
              name="price2"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Стоимость 2</p>
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
            <FormField
              control={form.control}
              name="day2"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Количество дней 2</p>
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
            <FormField
              control={form.control}
              name="price3"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Стоимость 3</p>
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
            <FormField
              control={form.control}
              name="day3"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Количество дней 3</p>
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
          <Button
            className="rounded-xl bg-slate-900  mt-2"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Сохранить изменения" : "Создать модификатор"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminModifierForm;
