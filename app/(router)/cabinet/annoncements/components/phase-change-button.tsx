"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

const PhaseSchema = z.object({
  phase: z.string(),
  id: z.string(),
});

type PhaseValue = z.infer<typeof PhaseSchema>;

interface PhaseFormValue {
  phase: string;
  title: string;
  id: string;
}

function PhaseChangeButton({ phase, title, id }: PhaseFormValue) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const params = useParams();
  const form = useForm<PhaseValue>({
    resolver: zodResolver(PhaseSchema),
  });

  form.setValue("phase", phase);
  form.setValue("id", id);

  async function onSubmit(formData: PhaseValue) {
    try {
      setLoading(true);

      await axios.patch(`/api/cabinet/profile/annoncements/phase`, formData);

      setTimeout(() => {
        router.refresh();
        toast({
          title: "Статус обьявления обновлено",
        });
      }, 2000);
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <button
        disabled={loading}
        type="submit"
        className=" rounded-xl w-full h-full flex flex-row items-center gap-x-2 px-3 py-4 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {title}
      </button>
    </form>
  );
}

export default PhaseChangeButton;
