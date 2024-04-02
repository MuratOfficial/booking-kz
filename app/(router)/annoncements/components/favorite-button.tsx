"use client";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

const FormSchema = z.object({
  id: z.string().min(2, {
    message: "id must be at least 2 characters.",
  }),
});

interface FavoriteButtonProps {
  id?: string;
  isFavorite?: boolean;
}

function FavoriteButton({ id, isFavorite }: FavoriteButtonProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: id,
    },
  });

  const onFavourite = async (formData: z.infer<typeof FormSchema>) => {
    try {
      await axios.patch(`/api/annoncements/${id}/favourite`, formData);

      router.refresh();
    } catch (error) {
      router.push("/auth");
      console.log(error);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onFavourite)}>
      {isFavorite === true ? (
        <button className=" px-1.5 py-1 overflow-hidden  rounded-full  duration-300 ease-in-out   flex  flex-row gap-x-1 items-center hover:bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
          <Heart className="stroke-red-600 fill-red-600" size={14} />
          <span className="text-slate-700 font-medium  text-xs ">
            В Избранных
          </span>
        </button>
      ) : (
        <button className=" px-1.5 py-1 overflow-hidden  rounded-full  duration-300 ease-in-out   flex  flex-row gap-x-1 items-center hover:bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
          <Heart className="stroke-slate-700" size={14} />
          <span className="text-slate-700 font-medium  text-xs ">
            В Избранные
          </span>
        </button>
      )}
    </form>
  );
}

export default FavoriteButton;
