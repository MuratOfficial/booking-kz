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
  Check,
  ChevronsUpDown,
  Info,
  Loader2,
  Pencil,
  Plus,
  Trash2,
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
import { Textarea } from "@/components/ui/textarea";
import { Address, Building, City, Town } from "@prisma/client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const cityFormSchema = z.object({
  cityOrDistrict: z.string({ required_error: "Напишите название" }),
});

type CityFormValues = z.infer<typeof cityFormSchema>;

interface AdminCityFormProps {
  initialData:
    | (City & {
        cityOrTown: Town[];
        addresses: Address[];
        buildings: Building[];
      })
    | null;
}

function AdminCityForm({ initialData }: AdminCityFormProps) {
  const form = useForm<CityFormValues>({
    resolver: zodResolver(cityFormSchema),
    defaultValues: {
      cityOrDistrict: initialData?.cityOrDistrict || "",
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  const [towns, setTowns] = React.useState<
    { id: string; name: string; cityId: string }[]
  >(initialData?.cityOrTown || []);

  const [addresses, setAddresses] = React.useState<
    {
      id: string;
      name: string;
      townId: string;
      cityId: string;
    }[]
  >(initialData?.addresses || []);

  async function onSubmit(formData: CityFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/admin/buildings/cities/${params.cityId}`,
          formData
        );
      } else {
        await axios.post(`/api/admin/buildings/cities`, formData);
      }
      router.refresh();
      router.push(`/admin/buildings/cities`);
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
        {initialData ? `Город "${initialData.cityOrDistrict}"` : "Новый город"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="w-full grid grid-cols-4 gap-4 bg-white px-6 py-4 rounded-xl">
            <FormField
              control={form.control}
              name="cityOrDistrict"
              render={({ field }) => (
                <FormItem className="text-slate-800 ">
                  <FormLabel className=" text-base font-semibold">
                    Название города (области)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Мангистауская область"
                      className="rounded-lg placeholder:text-slate-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-4 bg-white px-6 py-4 rounded-xl">
            <p className=" text-base font-semibold">Города (районы)</p>
            <div className="w-full flex-row flex gap-2">
              <div className="bg-blue-200 items-center flex flex-row gap-1 hover:bg-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium ">
                <span className="mr-2">Test</span>{" "}
                <button>
                  <Pencil className="w-3 hover:text-red-500" />{" "}
                </button>
                <button>
                  <Trash2 className="w-3 hover:text-red-500" />{" "}
                </button>
              </div>
              <div className="bg-blue-200 items-center flex flex-row gap-1 hover:bg-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium ">
                <span className="mr-2">Test</span>{" "}
                <button>
                  <Pencil className="w-3 hover:text-red-500" />{" "}
                </button>
                <button>
                  <Trash2 className="w-3 hover:text-red-500" />{" "}
                </button>
              </div>
              <button className="text-blue-300 hover:text-blue-500 items-center flex flex-row gap-1 hover:border-blue-500 border-2 border-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium ">
                + Добавить город
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 bg-white px-6 py-4 rounded-xl">
            <p className=" text-base font-semibold">Мкр. и улицы</p>
            <div className="w-full flex-row flex gap-2">
              <div className="bg-blue-200 items-center flex flex-row gap-1 hover:bg-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium ">
                <span className="mr-2">Test</span>{" "}
                <button>
                  <Pencil className="w-3 hover:text-red-500" />{" "}
                </button>
                <button>
                  <Trash2 className="w-3 hover:text-red-500" />{" "}
                </button>
              </div>
              <div className="bg-blue-200 items-center flex flex-row gap-1 hover:bg-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium ">
                <span className="mr-2">Test</span>{" "}
                <button>
                  <Pencil className="w-3 hover:text-red-500" />{" "}
                </button>
                <button>
                  <Trash2 className="w-3 hover:text-red-500" />{" "}
                </button>
              </div>
              <button className="text-blue-300 hover:text-blue-500 items-center flex flex-row gap-1 hover:border-blue-500 border-2 border-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium ">
                + Добавить мкр. и улицу
              </button>
            </div>
          </div>

          <Button
            className="rounded-xl bg-slate-900  mt-2"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Сохранить изменения" : "Создать город (область)"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminCityForm;
