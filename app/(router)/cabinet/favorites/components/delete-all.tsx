"use client";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Heart, HeartOff, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  id: z
    .string()
    .min(2, {
      message: "id must be at least 2 characters.",
    })
    .optional(),
});

function FavoriteAllButton() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: "444444",
    },
  });
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const onFavouriteAll = async (formData: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      await axios.patch(`/api/cabinet/profile/favoriteRemoveAll`, formData);
      console.log("button clicked");

      setTimeout(() => {
        router.refresh();
        toast({
          title: "Все избранные обьявления удалены",
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onFavouriteAll)}>
      <button
        onClick={() => console.log("event")}
        className="flex text-sm flex-row items-center group font-semibold gap-x-2 py-2 px-3 hover:bg-slate-900  border-slate-900 hover:text-white rounded-xl transition-all delay-100 duration-300 bg-white"
      >
        {loading ? (
          <Loader2 className=" w-4 animate-spin" />
        ) : (
          <HeartOff className="group-hover:stroke-red-500 transition-all delay-100 w-4 duration-300 stroke-slate-900" />
        )}{" "}
        Очистить все
      </button>
    </form>
  );
}

export default FavoriteAllButton;
