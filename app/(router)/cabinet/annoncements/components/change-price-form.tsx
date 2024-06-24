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
import { User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const priceFormSchema = z.object({
  price: z.coerce.number({ required_error: "Укажите цену" }).int(),
  id: z.string(),
});

type NewPriceFormValues = z.infer<typeof priceFormSchema>;

interface NewPriceFormProps {
  id: string | null;
  initialPrice?: number | null;
}

export function NewPriceForm({ id, initialPrice }: NewPriceFormProps) {
  const { toast } = useToast();
  const form = useForm<NewPriceFormValues>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      price: initialPrice || 0,
      id: id || "",
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  async function onSubmit(formData: NewPriceFormValues) {
    try {
      setLoading(true);
      await axios.patch(
        `/api/cabinet/profile/annoncements/priceChange`,
        formData
      );
      setOpen(false);
      setTimeout(() => {
        router.refresh();
        toast({
          title: "Цена изменена",
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className=" rounded-xl px-3 py-4 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200">
          Изменить цену
        </button>
      </DialogTrigger>
      <DialogContent className="w-[280px] rounded-xl">
        <DialogTitle>
          <p className="text-base font-semibold">Цена</p>
          <DialogDescription></DialogDescription>
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full grid grid-cols-3 gap-6 text-slate-800"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
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

            <Button
              className="rounded-xl bg-slate-800   col-span-3"
              type="submit"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Изменить цену
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
