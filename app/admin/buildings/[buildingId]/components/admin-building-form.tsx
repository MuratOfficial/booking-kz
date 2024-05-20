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
import { Check, ChevronsUpDown, Info, Loader2 } from "lucide-react";
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
import { Building, City, Subscription } from "@prisma/client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/uploaders/image-upload";
import YandexMap from "@/app/(router)/cabinet/annoncements/components/yandex-map";
import { useDebouncedCallback } from "use-debounce";
import { fetchMap } from "@/lib/fetchMap";

const buildingFormSchema = z.object({
  name: z.string({ required_error: "Напишите название" }),
  buildingYear: z.coerce
    .number()
    .int()
    .min(1900, { message: "Год Должен состоят из 4 цифр." })
    .max(new Date().getFullYear(), {
      message: "Год Должен быть меньше текущего",
    })
    .optional(),
  type: z.string().optional(),
  cityOrDistrict: z.string({ required_error: "Укажите город" }),
  cityOrTown: z.string().optional(),
  townOrStreet: z.string().optional(),
  floors: z.coerce.number().int().optional(),
  images: z.object({ url: z.string() }).array(),
  description: z.string().max(360, "Не Должно превышать 360 знаков"),
  coordinateX: z.string().optional(),
  coordinateY: z.string().optional(),
});

type BuildingFormValues = z.infer<typeof buildingFormSchema>;

interface AdminBuildingFormProps {
  initialData: Building | null;
  cities: City[] | null;
}

function AdminBuildingForm({ initialData, cities }: AdminBuildingFormProps) {
  const form = useForm<BuildingFormValues>({
    resolver: zodResolver(buildingFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      images: initialData?.images || [],
      description: initialData?.description || "",
      buildingYear: initialData?.buildingYear || 2013,
      type: initialData?.type || "Монолитный",
      floors: initialData?.floors || 0,
    },
  });

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  const services = [
    {
      value: "Монолитный",
      label: "Монолитный",
    },
    {
      value: "Кирпичный",
      label: "Кирпичный",
    },
    {
      value: "Блочный",
      label: "Блочный",
    },
  ];

  const [cityOrDistrict, setCityOrDistrict] = React.useState<string>(
    initialData?.cityOrDistrict || ""
  );
  const [townOrCity, setTownOrCity] = React.useState<string>(
    initialData?.cityOrTown || ""
  );
  const [streetOrHouse, setStreetOrHouse] = React.useState<string>(
    initialData?.townOrStreet || ""
  );
  const [pos1, setPos1] = React.useState<number | null>(null);
  const [pos2, setPos2] = React.useState<number | null>(null);
  const [zoom, setZoom] = React.useState<number | null>(null);

  const handleChange = useDebouncedCallback((term: string, type: string) => {
    if (type === "city") {
      setTownOrCity(term);
    }
    if (type === "street") {
      setStreetOrHouse(term);
    }
  }, 500);

  React.useEffect(() => {
    if (townOrCity || streetOrHouse) {
      setZoom(16);
    } else {
      setZoom(10);
    }

    const fetchData = async () => {
      const location = `${cityOrDistrict}+${townOrCity}+${streetOrHouse}`;
      if (!location.trim()) return;

      const positions = await fetchMap(location);
      if (positions) {
        setPos1(positions.pos1);
        form.setValue("coordinateX", positions.pos1.toString());
        setPos2(positions.pos2);
        form.setValue("coordinateY", positions.pos2.toString());
      } else {
        console.log("Failed to fetch position.");
      }
    };

    fetchData();
  }, [cityOrDistrict, townOrCity, streetOrHouse]);

  async function onSubmit(formData: BuildingFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/admin/buildings/${params.buildingId}`,
          formData
        );
      } else {
        await axios.post(`/api/admin/buildings`, formData);
      }
      router.refresh();
      router.push(`/admin/buildings`);
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
        {initialData
          ? `Жилой комплекс "${initialData.name}"`
          : "Новый жилой комплекс"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="w-full grid grid-cols-4 gap-4 bg-white px-6 py-4 rounded-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-slate-800 ">
                  <FormLabel className=" text-base font-semibold">
                    Название ЖК
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Алтын өлке..."
                      className="rounded-lg placeholder:text-slate-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildingYear"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <p className="text-base font-semibold">Год постройки</p>
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <div className="flex flex-row gap-x-2 items-center relative w-full">
                        <Input
                          className="w-full font-medium"
                          type="number"
                          {...field}
                        />
                        <p className="absolute right-2 text-sm font-medium text-slate-600">
                          год
                        </p>
                      </div>
                    </FormControl>
                  </FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <p className="text-base font-semibold">Тип постройки</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          services.find(
                            (service) => service.value === field.value
                          )?.label
                        ) : (
                          <span className="line-clamp-1">
                            Выберите тип постройки
                          </span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandGroup>
                          {services.map((service) => (
                            <CommandItem
                              value={service.label}
                              key={service.value}
                              onSelect={() => {
                                form.setValue("type", service.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  service.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {service.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="floors"
              render={({ field }) => (
                <FormItem className="text-slate-800 ">
                  <FormLabel className=" text-base font-semibold">
                    Количество этажей
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="15"
                      className="rounded-lg placeholder:text-slate-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 py-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <p className="text-base font-semibold">Описание</p>
                  <FormControl>
                    <Textarea
                      placeholder="Макс. 260 знаков"
                      className="resize-none min-h-[6rem]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 pt-4 pb-4">
            <p className=" font-semibold">Изображения жилого комплекса</p>
            <div className="flex flex-row items-center">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value.map((image) => image.url)}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url !== url
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="cityOrDistrict"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <p className="text-base font-semibold">Город (Область)</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between  flex flex-row gap-x-1 items-center",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          cities?.find(
                            (city) => city.cityOrDistrict === field.value
                          )?.cityOrDistrict
                        ) : (
                          <p className="line-clamp-1 text-slate-500">
                            Выберите город (область)
                          </p>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 max-h-40">
                      <Command>
                        <CommandInput placeholder="Найти..." />
                        <CommandEmpty>Не найдено.</CommandEmpty>
                        <CommandGroup>
                          {cities?.map((city) => (
                            <CommandItem
                              value={city.cityOrDistrict}
                              key={city.cityOrDistrict}
                              onSelect={() => {
                                form.setValue(
                                  "cityOrDistrict",
                                  city.cityOrDistrict
                                );
                                setCityOrDistrict(city.cityOrDistrict);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  city.cityOrDistrict === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {city.cityOrDistrict}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cityOrTown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Город (Район)
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between  flex flex-row gap-x-1 items-center",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            cities
                              ?.find(
                                (city) => city.cityOrDistrict === cityOrDistrict
                              )
                              ?.cityOrTown.find((el) => el.name === townOrCity)
                              ?.name
                          ) : (
                            <p className="line-clamp-1 text-slate-500">
                              Выберите город (район)
                            </p>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 max-h-40">
                        <Command>
                          <CommandInput placeholder="Найти..." />
                          <CommandEmpty>Не найдено.</CommandEmpty>
                          <CommandGroup>
                            {cities
                              ?.find(
                                (city) => city.cityOrDistrict === cityOrDistrict
                              )
                              ?.cityOrTown?.map((city) => (
                                <CommandItem
                                  value={city.name}
                                  key={city.name}
                                  onSelect={() => {
                                    form.setValue("cityOrTown", city.name);
                                    setTownOrCity(city.name);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      city.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.name}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormDescription className="flex flex-row gap-x-1 items-center text-xs text-slate-400">
                    <Info className="w-3" />
                    Укажите обл. центр или же район города
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="townOrStreet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Улица, мкр.
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between  flex flex-row gap-x-1 items-center",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            cities
                              ?.find(
                                (city) => city.cityOrDistrict === cityOrDistrict
                              )
                              ?.cityOrTown.find((el) => el.name === townOrCity)
                              ?.addresses.find(
                                (el) => el.name === streetOrHouse
                              )?.name
                          ) : (
                            <p className="line-clamp-1 text-slate-500">
                              Выберите город (район)
                            </p>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 max-h-40">
                        <Command>
                          <CommandInput placeholder="Найти..." />
                          <CommandEmpty>Не найдено.</CommandEmpty>
                          <CommandGroup>
                            {cities
                              ?.find(
                                (city) => city.cityOrDistrict === cityOrDistrict
                              )
                              ?.cityOrTown.find((el) => el.name === townOrCity)
                              ?.addresses.map((city) => (
                                <CommandItem
                                  value={city.name}
                                  key={city.name}
                                  onSelect={() => {
                                    form.setValue("townOrStreet", city.name);
                                    setStreetOrHouse(city.name);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      city.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.name}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormDescription className="flex flex-row gap-x-1 items-center text-xs text-slate-400">
                    <Info className="w-3" />
                    Укажите улицу или микрорайон, номер дома
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 py-4">
            <p className="text-base font-semibold">Расположение на карте</p>
            <YandexMap
              width={900}
              coordinate1={pos1}
              coordinate2={pos2}
              zoom={zoom}
            />
          </div>

          <Button
            className="rounded-xl bg-slate-900  mt-2"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Сохранить изменения" : "Создать жилой комплекс"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminBuildingForm;
