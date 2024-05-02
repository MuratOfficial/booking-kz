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

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";
import { Building, Refill, Subscription } from "@prisma/client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const refillFormSchema = z.object({
  title: z.string({ required_error: "Напишите название" }).optional(),

  total: z.coerce
    .number({ required_error: "Укажите сумму" })
    .int({ message: "Укажите целое числа" }),
  bonus: z.coerce.number().int({ message: "Укажите целое числа" }).optional(),
  bonusPerc: z.coerce
    .number()
    .int({ message: "Укажите целое числа" })
    .optional(),
});

type RefillFormValues = z.infer<typeof refillFormSchema>;

interface AdminRefillFormProps {
  initialData: Refill | null;
}

function AdminRefillForm({ initialData }: AdminRefillFormProps) {
  const form = useForm<RefillFormValues>({
    resolver: zodResolver(refillFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      total: initialData?.total || 0,
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);
  const [bonus, setBonus] = React.useState(initialData?.bonus || 0);
  const [bonusPerc, setBonusPerc] = React.useState(initialData?.bonusPerc || 0);
  const [total, setTotal] = React.useState(initialData?.total || 0);

  async function onSubmit(formData: RefillFormValues) {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/admin/refill/${params.refillId}`, formData);
      } else {
        await axios.post(`/api/admin/refill`, formData);
      }
      router.refresh();
      router.push(`/admin/refill`);
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

  React.useEffect(() => {
    setBonus((bonusPerc * total) / 100);
    form.setValue("bonus", bonus);
    console.log(bonus);
  }, [total, bonus, bonusPerc]);

  return (
    <div className="w-full flex flex-col gap-2 text-slate-900 py-4 pl-4 pr-6">
      <h1 className="text-2xl font-semibold ml-4">
        {initialData ? `Пополнение ${initialData.id}` : "Новое пополнение"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="w-full grid grid-cols-4 gap-4 bg-white px-6 py-4 rounded-xl">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="text-slate-800 ">
                  <FormLabel className=" text-base font-semibold">
                    Название (не обьязательно)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg placeholder:text-slate-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Сумма</p>
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <div className="flex flex-row gap-x-2 items-center relative w-full">
                        <Input
                          className="w-full font-medium"
                          type="number"
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                            setTotal(parseInt(e.target.value));
                          }}
                          value={total}
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
              name="bonusPerc"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">% бонус</p>
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <div className="flex flex-row gap-x-2 items-center relative w-full">
                        <Input
                          className="w-full font-medium"
                          type="number"
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                            setBonusPerc(parseInt(e.target.value));
                          }}
                          value={bonusPerc}
                        />
                        <p className="absolute right-2 text-sm font-medium text-slate-600">
                          %
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
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                            setBonus(parseInt(e.target.value));
                          }}
                          value={bonus}
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

          <Button
            className="rounded-xl bg-slate-900  mt-2"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Сохранить изменения" : "Создать пополнение"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminRefillForm;
