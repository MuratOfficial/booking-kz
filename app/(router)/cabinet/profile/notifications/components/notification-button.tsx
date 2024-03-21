"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const NotificationReadSchema = z.object({
  createdAt: z.date().nullable(),
  notifications: z
    .array(
      z
        .object({
          text: z.string().nullable().optional(),
          isOpened: z.boolean().nullable().optional(),
          createdAt: z.date().nullable().optional(),
          type: z.string().nullable().optional(),
        })
        .optional()
    )
    .nullable()
    .optional(),
});

type NotificationValue = z.infer<typeof NotificationReadSchema>;

interface NotificationReadFormValue {
  notifications: {
    type: string;
    isOpened: boolean;
    text: string;
    createdAt: Date;
  }[];
  createdAt: Date | null;
}

function NotificationButton({
  createdAt,
  notifications,
}: NotificationReadFormValue) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const params = useParams();
  const form = useForm<NotificationValue>({
    resolver: zodResolver(NotificationReadSchema),
  });

  form.setValue("createdAt", createdAt);
  form.setValue("notifications", notifications);

  async function onSubmit(formData: NotificationValue) {
    try {
      setLoading(true);

      await axios.patch(`/api/cabinet/profile/notifications`, formData);

      setTimeout(() => {
        router.refresh();
        toast({
          title: "Изменено на прочитанное",
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
        className="w-fit font-semibold text-xs text-slate-900 p-1 rounded-lg hover:bg-slate-200 transition delay-75 duration-200"
      >
        Отметить как прочитанное
      </button>
    </form>
  );
}

export default NotificationButton;
