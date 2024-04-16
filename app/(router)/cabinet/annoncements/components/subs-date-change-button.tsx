"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const PhaseSchema = z.object({
  id: z.string(),
});

type SubsDateValue = z.infer<typeof PhaseSchema>;

interface SubsDateFormValue {
  date?: Date | null;
  id: string;
}

function SubsDateChangeButton({ date, id }: SubsDateFormValue) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const params = useParams();
  const form = useForm<SubsDateValue>({
    resolver: zodResolver(PhaseSchema),
  });

  form.setValue("id", id);

  async function onSubmit(formData: SubsDateValue) {
    try {
      setLoading(true);

      await axios.patch(`/api/cabinet/profile/annoncements/subsDate`, formData);

      setTimeout(() => {
        router.refresh();
        toast({
          title: "Обьявление продлено",
        });
      }, 1000);
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const isWithinSevenDays = (
    date: Date | null | undefined
  ): boolean | undefined => {
    if (date) {
      const currentDate = new Date();
      const startDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
      return currentDate >= startDate;
    }
  };

  const isSubsDate = isWithinSevenDays(date);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <button
        disabled={!isSubsDate}
        className={cn(
          "flex flex-row items-center group transition delay-75 duration-200 gap-x-1 items-center hover:text-blue-500",
          !isSubsDate && " cursor-not-allowed hover:text-current"
        )}
      >
        {loading ? (
          <RefreshCcw className="w-3 animate-spin " />
        ) : (
          <RefreshCcw className="w-3 group-hover:rotate-180 transition delay-75 duration-200" />
        )}
        Продлить
      </button>
    </form>
  );
}

export default SubsDateChangeButton;
