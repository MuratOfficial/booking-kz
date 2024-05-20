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
  cityOrTown: z
    .object({
      name: z.string(),
      addresses: z
        .object({
          name: z.string(),
        })
        .array()
        .optional(),
    })
    .array()
    .optional(),
});

type CityFormValues = z.infer<typeof cityFormSchema>;

interface AdminCityFormProps {
  initialData:
    | (City & {
        buildings: Building[];
      })
    | null;
}

function AdminCityForm({ initialData }: AdminCityFormProps) {
  const form = useForm<CityFormValues>({
    resolver: zodResolver(cityFormSchema),
    defaultValues: {
      cityOrDistrict: initialData?.cityOrDistrict || "",
      cityOrTown: initialData?.cityOrTown || [],
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  // const [towns, setTowns] = React.useState<string[]>(
  //   initialData?.cityOrTown.map((el) => el.name) || []
  // );

  const [onTown, setOnTown] = React.useState(false);
  const [onAddress, setOnAddress] = React.useState(false);
  const [pickedTown, setPickedTown] = React.useState("");

  const [inputValue, setInputValue] = React.useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [towns, setTowns] = React.useState<Town[]>(
    (initialData?.cityOrTown && [...initialData?.cityOrTown]) || []
  );

  const addTown = (newTown: Town) => {
    setTowns((prevTowns) => [...prevTowns, newTown]);
  };

  const editTown = (index: number, updatedTown: Town) => {
    const updatedTowns = [...towns];
    updatedTowns[index] = updatedTown;
    setTowns(updatedTowns);
  };

  const [onEditTown, setOnEditTown] = React.useState("");
  const [onEditAddress, setOnEditAddress] = React.useState("");

  const removeTown = (index: number) => {
    const updatedTowns = towns.filter((_, i) => i !== index);
    setTowns(updatedTowns);
  };

  const [townIndex, setTownIndex] = React.useState(0);

  const addAddress = (townIndex: number, newAddress: Address) => {
    const updatedTowns = [...towns];
    updatedTowns[townIndex].addresses.push(newAddress);
    setTowns(updatedTowns);
  };

  const editAddress = (
    townIndex: number,
    addressIndex: number,
    updatedAddress: Address
  ) => {
    const updatedTowns = [...towns];
    updatedTowns[townIndex].addresses[addressIndex] = updatedAddress;
    setTowns(updatedTowns);
  };

  const removeAddress = (townIndex: number, addressIndex: number) => {
    const updatedTowns = [...towns];
    updatedTowns[townIndex].addresses = updatedTowns[
      townIndex
    ].addresses.filter((_, i) => i !== addressIndex);
    setTowns(updatedTowns);
  };

  React.useEffect(() => {
    form.setValue("cityOrTown", towns);
  }, [towns]);

  async function onSubmit(formData: CityFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/admin/cities/${params.cityId}`, formData);
      } else {
        await axios.post(`/api/admin/cities`, formData);
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
            <div className="w-full flex-row flex gap-2 flex-wrap">
              {towns.map((el, index) => (
                <div key={index}>
                  {onEditTown === el.name ? (
                    <div className=" flex flex-row gap-2 items-center">
                      <input
                        onChange={handleInputChange}
                        defaultValue={el.name}
                        type="text"
                        className="text-blue-300 focus-visible:border-blue-300 hover:text-blue-500 items-center flex flex-row gap-1 hover:border-blue-500 border-2 border-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium "
                      />
                      <button
                        type="button"
                        onClick={() => {
                          editTown(index, { ...el, name: inputValue });
                          setOnEditTown("");
                        }}
                        className=" bg-slate-100 rounded-lg py-1.5 px-2 font-medium text-blue-500 hover:bg-slate-300"
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <div
                      key={index}
                      onClick={() => {
                        setPickedTown(el.name), setTownIndex(index);
                      }}
                      className={cn(
                        "bg-blue-100 cursor-pointer items-center flex flex-row gap-1 hover:bg-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium ",
                        pickedTown === el.name && "bg-blue-300"
                      )}
                    >
                      <span className="mr-2">{el.name}</span>{" "}
                      <button
                        onClick={() => setOnEditTown(el.name)}
                        type="button"
                      >
                        <Pencil className="w-3 hover:text-red-500" />{" "}
                      </button>
                      <button onClick={() => removeTown(index)} type="button">
                        <Trash2 className="w-3 hover:text-red-500" />{" "}
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {!onTown && (
                <button
                  type="button"
                  onClick={() => setOnTown(true)}
                  className="text-blue-300 hover:text-blue-500 items-center flex flex-row gap-1 hover:border-blue-500 border-2 border-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium "
                >
                  + Добавить город
                </button>
              )}

              {onTown && (
                <div className=" flex flex-row gap-2 items-center">
                  <input
                    value={inputValue}
                    onChange={handleInputChange}
                    type="text"
                    className="text-blue-300 focus-visible:border-blue-300 hover:text-blue-500 items-center flex flex-row gap-1 hover:border-blue-500 border-2 border-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium "
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addTown({ name: inputValue, addresses: [] });
                      setOnTown(false);
                    }}
                    className=" bg-slate-100 rounded-lg py-1.5 px-2 font-medium text-blue-500 hover:bg-slate-300"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 bg-white px-6 py-4 rounded-xl">
            <p className=" text-base font-semibold">Мкр. и улицы</p>
            {pickedTown ? (
              <div className="w-full flex-row flex gap-2 flex-wrap">
                {towns
                  .filter((el) => el.name === pickedTown)[0]
                  .addresses.map((el, index) => (
                    <div key={index}>
                      {onEditAddress === el.name ? (
                        <div className=" flex flex-row gap-2 items-center">
                          <input
                            onChange={handleInputChange}
                            defaultValue={el.name}
                            type="text"
                            className="text-blue-300 focus-visible:border-blue-300 hover:text-blue-500 items-center flex flex-row gap-1 hover:border-blue-500 border-2 border-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium "
                          />
                          <button
                            type="button"
                            onClick={() => {
                              editAddress(townIndex, index, {
                                ...el,
                                name: inputValue,
                              });
                              setOnEditAddress("");
                            }}
                            className=" bg-slate-100 rounded-lg py-1.5 px-2 font-medium text-blue-500 hover:bg-slate-300"
                          >
                            OK
                          </button>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className={cn(
                            "bg-blue-100  items-center flex flex-row gap-1 hover:bg-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium "
                          )}
                        >
                          <span className="mr-2">{el.name}</span>{" "}
                          <button
                            onClick={() => setOnEditAddress(el.name)}
                            type="button"
                          >
                            <Pencil className="w-3 hover:text-red-500" />{" "}
                          </button>
                          <button
                            onClick={() => removeAddress(townIndex, index)}
                            type="button"
                          >
                            <Trash2 className="w-3 hover:text-red-500" />{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                {!onAddress && (
                  <button
                    type="button"
                    onClick={() => setOnAddress(true)}
                    className="text-blue-300 hover:text-blue-500 items-center flex flex-row gap-1 hover:border-blue-500 border-2 border-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium "
                  >
                    + Добавить мкр./улицу
                  </button>
                )}

                {onAddress && (
                  <div className=" flex flex-row gap-2 items-center">
                    <input
                      value={inputValue}
                      onChange={handleInputChange}
                      type="text"
                      className="text-blue-300 focus-visible:border-blue-300 hover:text-blue-500 items-center flex flex-row gap-1 hover:border-blue-500 border-2 border-blue-300 rounded-lg px-3.5 py-1.5 text-sm font-medium "
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addAddress(townIndex, { name: inputValue });
                        setOnAddress(false);
                      }}
                      className=" bg-slate-100 rounded-lg py-1.5 px-2 font-medium text-blue-500 hover:bg-slate-300"
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Выберите город(район)</p>
            )}
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
