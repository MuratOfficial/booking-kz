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
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

const testimonialFormSchema = z.object({
  userId: z.string(),
  comment: z.string().optional(),
  ranking: z.object({
    overall: z.string(),
    ranking1: z.string({ required_error: "Поставьте оценку" }),
    ranking2: z.string({ required_error: "Поставьте оценку" }),
    ranking3: z.string({ required_error: "Поставьте оценку" }),
    ranking4: z.string({ required_error: "Поставьте оценку" }),
    ranking5: z.string({ required_error: "Поставьте оценку" }),
    ranking6: z.string({ required_error: "Поставьте оценку" }),
  }),
});

type NewTestimonialFormValues = z.infer<typeof testimonialFormSchema>;

interface NewTestimonialFormProps {
  userId?: string | null;
  setOpen: (type: boolean) => void;
}

export function NewTestimonialForm({
  userId,
  setOpen,
}: NewTestimonialFormProps) {
  const { toast } = useToast();
  const form = useForm<NewTestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      userId: userId || "",
      ranking: {
        overall: "0",
        // ranking1: "0",
        // ranking2: "0",
        // ranking3: "0",
        // ranking4: "0",
        // ranking5: "0",
        // ranking6: "0",
      },
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  const calculateOverallRanking = () => {
    const rankingValues = Object.values(form.getValues("ranking"));
    const validRankingValues = rankingValues.filter(
      (value) => !isNaN(parseFloat(value))
    );
    if (validRankingValues.length > 0) {
      const sum = validRankingValues.reduce(
        (accumulator, currentValue) => accumulator + parseFloat(currentValue),
        0
      );
      const overallRanking = (sum / validRankingValues.length).toFixed(1);
      form.setValue("ranking.overall", overallRanking);
    } else {
      form.setValue("ranking.overall", "0");
    }
  };

  const [overall, setOverall] = React.useState("");

  React.useEffect(() => {
    calculateOverallRanking();
    setOverall(form.getValues("ranking.overall"));
  }, [
    form.watch("ranking.overall"),
    form.watch("ranking.ranking1"),
    form.watch("ranking.ranking2"),
    form.watch("ranking.ranking3"),
    form.watch("ranking.ranking4"),
    form.watch("ranking.ranking5"),
    form.watch("ranking.ranking6"),
  ]);

  async function onSubmit(formData: NewTestimonialFormValues) {
    try {
      setLoading(true);
      await axios.patch(
        `/api/annoncements/${params.annoncementId}/testimonial`,
        formData
      );
      setOpen(false);
      setTimeout(() => {
        router.refresh();
        toast({
          title: "Ваш отзыв был отправлен",
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
        className="w-full grid grid-cols-3 gap-6 text-slate-800"
      >
        <FormField
          control={form.control}
          name="ranking.ranking1"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Чистота</FormLabel>
              <div className="flex flex-row justify-between gap-x-2 items-center">
                <FormControl>
                  <Slider
                    defaultValue={[parseFloat(field.value) || 0]}
                    max={10}
                    step={1}
                    onValueChange={(e) => {
                      field.onChange(e.join());
                    }}
                  />
                </FormControl>
                <p className="font-semibold w-16 text-right">
                  {field.value}/10
                </p>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ranking.ranking2"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Соответствие фото
              </FormLabel>
              <div className="flex flex-row justify-between gap-x-2 items-center">
                <FormControl>
                  <Slider
                    defaultValue={[parseFloat(field.value) || 0]}
                    max={10}
                    step={1}
                    onValueChange={(e) => {
                      field.onChange(e.join());
                    }}
                  />
                </FormControl>
                <p className="font-semibold w-16 text-right">
                  {field.value}/10
                </p>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ranking.ranking3"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Расположение
              </FormLabel>
              <div className="flex flex-row justify-between gap-x-2 items-center">
                <FormControl>
                  <Slider
                    defaultValue={[parseFloat(field.value) || 0]}
                    max={10}
                    step={1}
                    onValueChange={(e) => {
                      field.onChange(e.join());
                    }}
                  />
                </FormControl>
                <p className="font-semibold w-16 text-right">
                  {field.value}/10
                </p>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ranking.ranking4"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Качество обслуживания
              </FormLabel>
              <div className="flex flex-row justify-between gap-x-2 items-center">
                <FormControl>
                  <Slider
                    defaultValue={[parseFloat(field.value) || 0]}
                    max={10}
                    step={1}
                    onValueChange={(e) => {
                      field.onChange(e.join());
                    }}
                  />
                </FormControl>
                <p className="font-semibold w-16 text-right">
                  {field.value}/10
                </p>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ranking.ranking5"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Состояние ремонта
              </FormLabel>
              <div className="flex flex-row justify-between gap-x-2 items-center">
                <FormControl>
                  <Slider
                    defaultValue={[parseFloat(field.value) || 0]}
                    max={10}
                    step={1}
                    onValueChange={(e) => {
                      field.onChange(e.join());
                    }}
                  />
                </FormControl>
                <p className="font-semibold w-16 text-right">
                  {field.value}/10
                </p>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ranking.ranking6"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Инфраструктура
              </FormLabel>
              <div className="flex flex-row justify-between gap-x-2 items-center">
                <FormControl>
                  <Slider
                    defaultValue={[parseFloat(field.value) || 0]}
                    max={10}
                    step={1}
                    onValueChange={(e) => {
                      field.onChange(e.join());
                    }}
                  />
                </FormControl>
                <p className="font-semibold w-16 text-right">
                  {field.value}/10
                </p>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <p className="font-semibold">Общий средний балл: {overall}</p>
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <p className="text-base font-semibold">Отзыв</p>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="resize-none min-h-[4rem]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="rounded-xl bg-slate-800  mt-2 col-span-3"
          type="submit"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Отправить отзыв и оценку
        </Button>
      </form>
    </Form>
  );
}
