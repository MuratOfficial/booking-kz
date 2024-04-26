"use client";
import { Loader2, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";

const FormSchema = z.object({
  id: z.string().min(2, {
    message: "id must be at least 2 characters.",
  }),
});

interface CallButtonProps {
  id?: string;
  phone: string | null | undefined;
}

function CallButton({ phone, id }: CallButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: id,
    },
  });

  const onMobile = async (formData: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      await axios.patch(`/api/annoncements/${id}/mobile`, formData);
      setOpen(true);

      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex">
      {open ? (
        <Link
          href={`tel:${phone}`}
          className="flex flex-row items-center gap-x-2 justify-center font-semibold hover:text-blue-500"
        >
          <Phone className="w-4" />
          {phone}
        </Link>
      ) : (
        <form onSubmit={form.handleSubmit(onMobile)} className="w-full flex">
          <button className="flex flex-row p-3 w-full hover:opacity-80 items-center gap-x-1.5 justify-center rounded-xl bg-blue-500 font-medium text-neutral-50">
            {loading ? (
              <Loader2 className="w-4 animate-spin" />
            ) : (
              <Phone className="w-4" />
            )}

            <span>Позвонить</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default CallButton;
