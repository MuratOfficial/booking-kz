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
  CalendarFold,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  ImagePlus,
  Info,
  Loader2,
  Puzzle,
  Timer,
  TimerReset,
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import YandexMap from "@/app/(router)/cabinet/annoncements/components/yandex-map";
import ImageUpload from "@/components/uploaders/image-upload";
import { Annoncement, Building, User } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const annoncementFormSchema = z.object({
  userId: z
    .string({ required_error: "Пользователь не выбран" })
    .nullable()
    .optional(),
  phone: z
    .string()
    .refine((data) => /^\+?\d+$/.test(data), {
      message: "Укажите правильный номер телефона",
    })
    .optional(),
  serviceType: z.string({ required_error: "Выберите вид обьявления" }),
  categoryType: z.string({ required_error: "Выберите тип недвижимости" }),
  serviceTypeExt: z
    .string({ required_error: "Выберите вид аренды" })
    .optional(),
  roomNumber: z.coerce
    .number({ required_error: "Нужно указать кол. комнат" })
    .optional(),
  floor: z.coerce.number({ required_error: "Укажите этаж" }).optional(),
  floorFrom: z.coerce.number().optional(),
  areaSq: z.coerce.number().optional(),
  repairType: z.string().optional(),
  roofHeight: z.string().optional(),
  yearBuild: z.coerce
    .number()
    .int()
    .min(1900, { message: "Год Должен состоят из 4 цифр." })
    .max(new Date().getFullYear(), {
      message: "Год Должен быть меньше текущего",
    })
    .optional(),
  price: z.coerce.number({ required_error: "Укажите цену" }).int(),
  priceNego: z.boolean().default(false),
  description: z
    .string()
    .min(75, "Не Должно быть меньше 75 знаков")
    .max(2000, "Не Должно превышать 2000 знаков"),
  moderatorText: z
    .string()
    .max(320, "Не Должно превышать 320 знаков")
    .optional(),
  comeIn: z.string().optional(),
  comeOut: z.string().optional(),
  additionalFilters: z
    .array(z.object({ value: z.string().nullable().optional() }).optional())
    .nullable()
    .optional(),
  images: z.object({ url: z.string() }).array(),
  cityOrDistrict: z.string({ required_error: "Укажите город" }),
  cityOrTown: z.string().optional(),
  townOrStreet: z.string().optional(),
  buildingId: z.string().nullable().optional(),
  isChecked: z.boolean().default(false),
  subscriptionDate: z.date({ required_error: "Выберите дату" }).optional(),
  phase: z.string({ required_error: "Необходимо указать фазу" }),
  modificators: z
    .object({
      topModifier: z.coerce.number().int().optional(),
      hotModifier: z.coerce.number().int().optional(),
      hurryModifier: z.coerce.number().int().optional(),
    })
    .optional(),
});

type AnnoncementFormValues = z.infer<typeof annoncementFormSchema>;

interface AdminAnnoncementFormProps {
  initialData: Annoncement | null;
  users: User[];
  buildings: Building[];
}

function AdminAnnoncementForm({
  initialData,
  users,
  buildings,
}: AdminAnnoncementFormProps) {
  const currentDataAndTime = new Date();
  let add30days: Date = new Date();
  add30days.setDate(add30days.getDate() + 30);

  const form = useForm<AnnoncementFormValues>({
    resolver: zodResolver(annoncementFormSchema),
    defaultValues: {
      modificators: {
        topModifier: initialData?.modificators?.topModifier || 0,
        hotModifier: initialData?.modificators?.hotModifier || 0,
        hurryModifier: initialData?.modificators?.hurryModifier || 0,
      },
      userId: initialData?.userId || null,
      serviceType: initialData?.serviceType || "",
      categoryType: initialData?.categoryType || "",
      serviceTypeExt: initialData?.serviceTypeExt || "",
      cityOrTown: initialData?.cityOrTown || "",
      phone: initialData?.phone || "",
      roomNumber: initialData?.roomNumber || 1,
      floor: initialData?.floor || 1,
      floorFrom: initialData?.floorFrom || 1,
      areaSq: initialData?.areaSq || 0,
      repairType: initialData?.repairType || "",
      roofHeight: initialData?.roofHeight || "",
      cityOrDistrict: initialData?.cityOrDistrict || "",
      buildingId: initialData?.buildingId || null,
      additionalFilters:
        initialData?.additionalFilters?.map((filter, index) => ({
          value: filter?.value || "",
        })) || null,

      yearBuild: initialData?.yearBuild || 2013,
      price: initialData?.price || 0,
      priceNego: initialData?.priceNego || false,

      comeIn: initialData?.comeIn || "После 14:00",
      comeOut: initialData?.comeOut || "До 12:00",
      images: initialData?.images || [],
      townOrStreet: initialData?.townOrStreet || "",
      isChecked: initialData?.isChecked || false,
      subscriptionDate: initialData?.subscriptionDate || add30days,
      phase: initialData?.phase || "проверка",
      description: initialData?.description || "",
      moderatorText: initialData?.moderatorText || "",
    },
  });

  // const { fields, append } = useFieldArray({
  //   name: "additionalFilter",
  //   control: form.control,
  // });
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(formData: AnnoncementFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/admin/annoncements/${params.annoncementId}`,
          formData
        );
      } else {
        await axios.post(`/api/admin/annoncements`, formData);
      }
      router.refresh();
      router.push(`/admin/annoncements`);
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

  const [serviceTypeState, setServiceTypeState] = React.useState("");
  const [manual, setManual] = React.useState(false);

  const services = [
    {
      value: "Продажа",
      label: "Продажа",
    },
    {
      value: "Аренда",
      label: "Аренда",
    },
  ];

  const cities = [
    {
      value: "Астана",
      label: "Астана",
    },
    {
      value: "Алматы",
      label: "Алматы",
    },
    {
      value: "Шымкент",
      label: "Шымкент",
    },
    {
      value: "Актюбинская обл.",
      label: "Актюбинская обл.",
    },
    {
      value: "Алматинская обл.",
      label: "Алматинская обл.",
    },
    {
      value: "Атырауская обл.",
      label: "Атырауская обл.",
    },
    {
      value: "Жамбылская обл.",
      label: "Жамбылская обл.",
    },
    {
      value: "Акмолинская обл.",
      label: "Акмолинская обл.",
    },
    {
      value: "Восточно-Казахстанская обл.",
      label: "Восточно-Казахстанская обл.",
    },
    {
      value: "Западно-Казахстанская обл.",
      label: "Западно-Казахстанская обл.",
    },
    {
      value: "Карагандинская обл.",
      label: "Карагандинская обл.",
    },
    {
      value: "Костанайская обл.",
      label: "Костанайская обл.",
    },
    {
      value: "Кызылординская обл.",
      label: "Кызылординская обл.",
    },
    {
      value: "Мангистауская обл.",
      label: "Мангистауская обл.",
    },
    {
      value: "Павлодарская обл.",
      label: "Павлодарская обл.",
    },
    {
      value: "Северо-Казахстанская обл.",
      label: "Северо-Казахстанская обл.",
    },
    {
      value: "Туркестанская обл.",
      label: "Туркестанская обл.",
    },
    {
      value: "Абайская обл.",
      label: "Абайская обл.",
    },
    {
      value: "Жетысуйская обл.",
      label: "Жетысуйская обл.",
    },
    {
      value: "Улытауская обл.",
      label: "Улытауская обл.",
    },
  ];

  const comeTime = [
    {
      value: "После 8:00",
    },
    {
      value: "После 9:00",
    },
    {
      value: "После 10:00",
    },
    {
      value: "После 11:00",
    },
    {
      value: "После 12:00",
    },
    {
      value: "После 13:00",
    },
    {
      value: "После 14:00",
    },
    {
      value: "После 15:00",
    },
    {
      value: "После 16:00",
    },
    {
      value: "После 17:00",
    },
    {
      value: "После 18:00",
    },
    {
      value: "После 19:00",
    },
    {
      value: "После 20:00",
    },
    {
      value: "После 21:00",
    },
    {
      value: "После 22:00",
    },
    {
      value: "После 23:00",
    },
    {
      value: "После 00:00",
    },
  ];

  const outTime = [
    {
      value: "До 8:00",
    },
    {
      value: "До 9:00",
    },
    {
      value: "До 10:00",
    },
    {
      value: "До 11:00",
    },
    {
      value: "До 12:00",
    },
    {
      value: "До 13:00",
    },
    {
      value: "До 14:00",
    },
    {
      value: "До 15:00",
    },
    {
      value: "До 16:00",
    },
    {
      value: "До 17:00",
    },
    {
      value: "До 18:00",
    },
    {
      value: "До 19:00",
    },
    {
      value: "До 20:00",
    },
    {
      value: "До 21:00",
    },
    {
      value: "До 22:00",
    },
    {
      value: "До 23:00",
    },
    {
      value: "До 00:00",
    },
  ];

  const roofHeight = [
    {
      value: "Высокая",
      label: "Высокая",
    },
    {
      value: "Средняя",
      label: "Средняя",
    },
    {
      value: "Низкая",
      label: "Низкая",
    },
  ];

  const repairTypes = [
    {
      value: "Новая",
      label: "Новая",
    },
    {
      value: "Среднее",
      label: "Среднее",
    },
    {
      value: "Требуется ремонт",
      label: "Требуется ремонт",
    },
    {
      value: "Без ремонта",
      label: "Без ремонта",
    },
  ];

  const menuList1 = [
    {
      value: "Квартиры",
    },
    {
      value: "Дома, дачи, коттеджи",
    },
    {
      value: "Гаражи",
    },
    {
      value: "Паркинги",
    },
    {
      value: "Земельный участок",
    },
    {
      value: "Коммерческая недвижимость",
    },
    {
      value: "Помещения",
    },
    {
      value: "Магазины",
    },
    {
      value: "Заводы и промбазы",
    },
    {
      value: "Прочее",
    },
  ];

  const menuList2 = [
    {
      value: "Квартиры, апартаменты",
    },
    {
      value: "Дома, дачи, коттеджи",
    },
    {
      value: "Комнаты",
    },
    {
      value: "Отели, гостиницы",
    },
    {
      value: "Глэмпинги, базы отдыха",
    },
    {
      value: "Хостелы",
    },
    {
      value: "Гаражи",
    },
    {
      value: "Паркинги",
    },
    {
      value: "Коммерческая недвижимость",
    },
    {
      value: "Помещения",
    },
    {
      value: "Магазины",
    },
    {
      value: "Промбазы",
    },
    {
      value: "Прочее",
    },
  ];

  const phases = [
    {
      value: "активно",
      label: "активно",
    },
    {
      value: "проверка",
      label: "проверка",
    },
    {
      value: "блокировано",
      label: "блокировано",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2 text-slate-900 py-4 pl-4 pr-6">
      <h1 className="text-2xl font-semibold ml-4">
        {initialData ? `Обьявление ID ${initialData.id}` : "Новое обьявление"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="w-full grid grid-cols-3 gap-6 ">
            <div className="col-span-2 gap-4 grid-cols-2 grid bg-white rounded-xl py-4 px-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <p className="text-base font-semibold">Пользователь</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[280px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? users.find((user) => user.id === field.value)
                                ?.username
                            : "Выберите пользователя"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandInput placeholder="Искать польз..." />
                          <CommandEmpty>Не найдено польз.</CommandEmpty>
                          <CommandGroup>
                            {users?.map((user) => (
                              <CommandItem
                                value={user.id}
                                key={user.id}
                                onSelect={() => {
                                  form.setValue("userId", user.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    user.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {user.username}
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Номер телефона*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" placeholder:opacity-50"
                        placeholder="+ 7 777 777 77 77"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="flex flex-row gap-x-1 items-center text-xs text-slate-400">
                      <Info className="w-3" />
                      Номер телефона в формате +7 ХХХ ХХХ ХХ ХХ
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex text-slate-50 flex-col items-center justify-between py-4 px-6 rounded-xl bg-slate-800">
              <div className="flex flex-col  items-center text-sm">
                <p className="font-semibold">Дата и время создания</p>
                <p suppressHydrationWarning>
                  {initialData?.createdAt.toLocaleDateString() ||
                    currentDataAndTime.toLocaleDateString()}{" "}
                  {initialData?.createdAt.toLocaleTimeString() ||
                    currentDataAndTime.toLocaleTimeString()}
                </p>
              </div>
              <div className="flex flex-col  items-center text-sm">
                <p className="font-semibold">
                  Дата и время последнего изменения
                </p>
                <p>
                  {initialData?.updatedAt.toLocaleDateString() || "-"}{" "}
                  {initialData?.updatedAt.toLocaleTimeString() || "-"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full text-slate-50 flex flex-col  bg-emerald-700 rounded-xl py-4 px-6">
            <p className="font-semibold leading-3 text-xs text-neutral-200 flex flex-row gap-x-1 items-center">
              <Puzzle className="w-3" />
              Панель модератора
            </p>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="subscriptionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-medium flex text-base flex-row gap-x-1 items-center">
                      <CalendarFold className="w-4" /> Активно до
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal text-slate-900",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ru })
                            ) : (
                              <span>Выберите дату</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={ru}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phase"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <p className="text-base font-semibold">Фаза обьявления</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[280px] justify-between text-slate-900 capitalize",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? phases.find(
                                (phase) => phase.value === field.value
                              )?.label
                            : "Выберите фазу"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandGroup>
                            {phases.map((phase) => (
                              <CommandItem
                                value={phase.label}
                                key={phase.value}
                                className=" capitalize"
                                onSelect={() => {
                                  form.setValue("phase", phase.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    phase.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {phase.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                    <FormDescription className="text-white">
                      Установите "Активно" если обьявление прошло проверку
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isChecked"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center bg-slate-800 justify-between rounded-lg p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Валидировано</FormLabel>
                      <FormDescription>
                        Данные по обьявлению достоверны, валидация прошла
                        успешно
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modificators.topModifier"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4 ">
                    <p className="text-base font-semibold">Модификатор ТОП</p>
                    <FormControl>
                      <div className="flex flex-row gap-x-2 items-center relative w-fit">
                        <Input
                          className="w-12 text-slate-800"
                          type="number"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modificators.hotModifier"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4 ">
                    <p className="text-base font-semibold">
                      Модификатор Горячее
                    </p>
                    <FormControl>
                      <div className="flex flex-row gap-x-2 items-center relative w-fit">
                        <Input
                          className="w-12 text-slate-800"
                          type="number"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modificators.hurryModifier"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4 ">
                    <p className="text-base font-semibold">
                      Модификатор Срочно
                    </p>
                    <FormControl>
                      <div className="flex flex-row gap-x-2 items-center relative w-fit">
                        <Input
                          className="w-12 text-slate-800"
                          type="number"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moderatorText"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <p className="text-base font-semibold ">
                      Сообщение модератора
                    </p>
                    <FormControl>
                      <Textarea
                        placeholder="Опишите кратко причину отказа, блокировки и т.д."
                        className="resize-none min-h-[4rem] text-neutral-800"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 bg-white rounded-xl py-4 px-6">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <p className="text-base font-semibold">Вид обьявления</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[280px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? services.find(
                                (service) => service.value === field.value
                              )?.label
                            : "Выберите вид обьявления"}
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
                                  form.setValue("serviceType", service.value);
                                  setServiceTypeState(service.value);
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
              {serviceTypeState === "Продажа" && (
                <FormField
                  control={form.control}
                  name="categoryType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <p className="text-base font-semibold">
                        Категория недвижимости
                      </p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[280px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? menuList1.find(
                                  (item) => item.value === field.value
                                )?.value
                              : "Выберите кат. недвижимости"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0">
                          <Command>
                            <CommandGroup>
                              {menuList1.map((item) => (
                                <CommandItem
                                  value={item.value}
                                  key={item.value}
                                  onSelect={() => {
                                    form.setValue("categoryType", item.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      item.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {item.value}
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
              )}
              {serviceTypeState === "Аренда" && (
                <>
                  <FormField
                    control={form.control}
                    name="categoryType"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <p className="text-base font-semibold">
                          Категория недвижимости
                        </p>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[280px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? menuList2.find(
                                    (item) => item.value === field.value
                                  )?.value
                                : "Выберите кат. недвижимости"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[280px] p-0">
                            <Command>
                              <CommandGroup>
                                {menuList2.map((item) => (
                                  <CommandItem
                                    value={item.value}
                                    key={item.value}
                                    onSelect={() => {
                                      form.setValue("categoryType", item.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        item.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {item.value}
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
                    name="serviceTypeExt"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <p className="text-base font-semibold">Вид аренды</p>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[280px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? field.value
                                : "Выберите вид аренды"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[280px] p-0">
                            <Command>
                              <CommandGroup>
                                <CommandItem
                                  value="Посуточно"
                                  key="Посуточно"
                                  onSelect={() => {
                                    form.setValue(
                                      "serviceTypeExt",
                                      "Посуточно"
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === "Посуточно"
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Посуточно
                                </CommandItem>
                                <CommandItem
                                  value="Почасовая"
                                  key="Почасовая"
                                  onSelect={() => {
                                    form.setValue(
                                      "serviceTypeExt",
                                      "Почасовая"
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === "Почасовая"
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Почасовая
                                </CommandItem>
                                <CommandItem
                                  value="Помесячно"
                                  key="Помесячно"
                                  onSelect={() => {
                                    form.setValue(
                                      "serviceTypeExt",
                                      "Помесячно"
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === "Помесячно"
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Помесячно
                                </CommandItem>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 pt-4 pb-4">
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
          <div className="w-full flex flex-row items-center justify-between gap-8">
            <div className="flex flex-row items-start justify-between px-6 py-4 rounded-xl gap-8 bg-white w-full">
              <div className="flex flex-col gap-2  justify-between w-fit">
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <p className="text-base font-semibold">Комнатность</p>
                      <FormControl>
                        <ToggleGroup
                          onChange={field.onChange}
                          className="grid grid-cols-5 gap-2"
                          type="single"
                          disabled={manual}
                        >
                          {Array<number>(1, 2, 3, 4, 5).map((el, ind) => (
                            <ToggleGroupItem
                              key={ind}
                              value={el.toString()}
                              className="text-sm h-10 border w-10"
                            >
                              {el !== 5 ? el : "5+"}
                            </ToggleGroupItem>
                          ))}
                          {/* <ToggleGroupItem
                            value="5+"
                            className="text-sm h-10 border w-10"
                          >
                            5+
                          </ToggleGroupItem> */}
                        </ToggleGroup>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <div className="flex flex-row gap-x-1 items-center justify-evenly">
                          <button
                            type="button"
                            onClick={() => setManual(true)}
                            className="text-sm font-medium text-neutral-600 py-2 px-4 rounded-md border hover:bg-slate-100"
                          >
                            Указать вручную
                          </button>
                          {manual && (
                            <Input
                              className="w-12"
                              type="number"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>

              <div className="flex flex-col gap-2 items-center">
                <p className="text-base font-semibold">Этаж</p>
                <div className="flex flex-row gap-2 items-center">
                  <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Input
                            className="w-12"
                            type="number"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <p className="text-sm text-slate-600">из</p>
                  <FormField
                    control={form.control}
                    name="floorFrom"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Input
                            className="w-12"
                            type="number"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="areaSq"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <p className="text-base font-semibold">Площадь</p>
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <div className="flex flex-row gap-x-2 items-center relative w-fit">
                          <Input
                            className="w-36"
                            type="number"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <p className="absolute right-2 text-sm font-medium text-slate-600">
                            м²
                          </p>
                        </div>
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-fit bg-white px-6 py-4 rounded-xl h-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <p className="text-base font-semibold">Цена</p>
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <div className="flex flex-row gap-x-2 items-center relative w-fit">
                          <Input
                            className="w-44"
                            type="number"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <p className="absolute right-2 text-sm font-medium text-slate-600">
                            ₸
                          </p>
                        </div>
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="priceNego"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Договорная
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 py-4">
            <div className="grid grid-cols-3 justify-between gap-4">
              <FormField
                control={form.control}
                name="repairType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <p className="text-base font-semibold">Состояние ремонта</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[280px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? repairTypes.find(
                                (repair) => repair.value === field.value
                              )?.label
                            : "Выберите состояние ремонта"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandGroup>
                            {repairTypes.map((repair) => (
                              <CommandItem
                                value={repair.label}
                                key={repair.value}
                                onSelect={() => {
                                  form.setValue("repairType", repair.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    repair.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {repair.label}
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
                name="roofHeight"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <p className="text-base font-semibold">Высота потолков</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[280px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? roofHeight.find(
                                (item) => item.value === field.value
                              )?.label
                            : "Выберите высоту потолков"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandGroup>
                            {roofHeight.map((item) => (
                              <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("roofHeight", item.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {item.label}
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
                name="yearBuild"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <p className="text-base font-semibold">Год постройки</p>
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <div className="flex flex-row gap-x-2 items-center relative w-fit">
                          <Input
                            className="w-36 font-medium"
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
            </div>
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
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 py-4">
            <p className="text-base font-semibold">Правила заселения</p>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-sm text-slate-600">Время заселения</p>
              <FormField
                control={form.control}
                name="comeIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[280px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? field.value : ""}
                            <Timer className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0 h-[280px] overflow-y-auto ">
                          <Command>
                            <CommandGroup className=" overflow-auto">
                              {comeTime.map((item) => (
                                <CommandItem
                                  value={item.value}
                                  key={item.value}
                                  onSelect={() => {
                                    form.setValue("comeIn", item.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      item.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {item.value}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="text-sm text-slate-600 ml-4">Время выселения</p>
              <FormField
                control={form.control}
                name="comeOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[280px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? field.value : ""}
                            <Timer className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0 h-[280px] overflow-y-auto ">
                          <Command>
                            <CommandGroup className=" overflow-auto">
                              {outTime.map((item) => (
                                <CommandItem
                                  value={item.value}
                                  key={item.value}
                                  onSelect={() => {
                                    form.setValue("comeOut", item.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      item.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {item.value}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name={`additionalFilters.${0}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Курение запрещено")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Курение запрещено
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${1}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Курение разрешено")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Курение разрешено
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${2}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Можно с детьми")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Можно с детьми
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${3}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Можно с животными")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Можно с животными
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${4}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Вечеринки разрешены")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Вечеринки разрешены
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${5}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Взимается залог")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Взимается залог
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 py-4">
            <p className="text-base font-semibold">Удобства</p>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name={`additionalFilters.${6}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Интернет wi-fi")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Интернет wi-fi
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${7}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Кондиционер")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Кондиционер
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${8}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Телевизор")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Телевизор
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${9}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("SMART ТВ")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      SMART ТВ
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${10}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Стиральная машина")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Стиральная машина
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${11}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Микроволновка")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Микроволновка
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${12}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Электрочайник")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Электрочайник
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${13}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Посуда и принадлежности")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Посуда и принадлежности
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${14}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Посудомоечная машина")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Посудомоечная машина
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${15}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Утюг с гладильной доской")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Утюг с гладильной доской
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${16}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Халаты")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Халаты
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${17}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Полотенца")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Полотенца
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${18}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state ? field.onChange("Фен") : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">Фен</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${19}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Сушилка для белья")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Сушилка для белья
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${20}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Балкон, лоджия")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Балкон, лоджия
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-base font-semibold mt-4">На территории</p>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name={`additionalFilters.${21}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Парковка")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Парковка
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${22}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Детская площадка")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Детская площадка
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${23}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Беседка")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Беседка
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${24}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Видеонаблюдение")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Видеонаблюдение
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${25}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Охраняемая территория")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Охраняемая территория
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
            </div>
            <p className="text-base font-semibold mt-4">Вид из окна</p>
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name={`additionalFilters.${26}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("На море")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      На море
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${27}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Частично на море")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Частично на море
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${28}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Вид во двор")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Вид во двор
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${29}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("На город")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      На город
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{" "}
            <p className="text-base font-semibold mt-4">Санузел</p>
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name={`additionalFilters.${30}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Раздельный")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Раздельный
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${31}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Совмещеный")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Совмещеный
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${32}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("2 санузла и более")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      2 санузла и более
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${33}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state ? field.onChange("Ванна") : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">Ванна</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${34}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Душевая перегородка")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Душевая перегородка
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${35}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Джакузи")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Джакузи
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${36}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Бойлер")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Бойлер
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${37}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Гигиенический душ")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Гигиенический душ
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-base font-semibold mt-4">Дополнительно</p>
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name={`additionalFilters.${38}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state ? field.onChange("Лифт") : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">Лифт</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFilters.${39}.value`}
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-x-2 items-center ">
                    <FormControl>
                      <Checkbox
                        checked={field.value ? true : false}
                        onCheckedChange={(state) =>
                          state
                            ? field.onChange("Доступ для инвалидов")
                            : field.onChange(null)
                        }
                        className="bg-slate-100 shadow-inner mt-2"
                      />
                    </FormControl>
                    <p className="text-sm font-medium text-slate-700 ">
                      Доступ для инвалидов
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 py-4">
            <div className="grid grid-cols-4 gap-4">
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
                            "w-[220px] justify-between  flex flex-row gap-x-1 items-center",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            cities.find((city) => city.value === field.value)
                              ?.label
                          ) : (
                            <p className="line-clamp-1 text-slate-500">
                              Выберите город (область)
                            </p>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit p-0 max-h-40">
                        <Command>
                          <CommandInput placeholder="Найти..." />
                          <CommandEmpty>Не найдено.</CommandEmpty>
                          <CommandGroup>
                            {cities.map((city) => (
                              <CommandItem
                                value={city.label}
                                key={city.value}
                                onSelect={() => {
                                  form.setValue("cityOrDistrict", city.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    city.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {city.label}
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
                      <Input
                        className=" placeholder:opacity-50"
                        placeholder="г. Костанай"
                        {...field}
                      />
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
                      Улица, мкр., номер дома
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" placeholder:opacity-50"
                        placeholder="16 мкр., 5 дом"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="flex flex-row gap-x-1 items-center text-xs text-slate-400">
                      <Info className="w-3" />
                      Укажите улицу или микрорайон, номер дома
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <p className="text-base font-semibold">ЖК</p>
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
                            buildings.find(
                              (building) => building.id === field.value
                            )?.name
                          ) : (
                            <p className="line-clamp-1 text-slate-500">
                              Выберите ЖК
                            </p>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandInput placeholder="Искать ЖК..." />
                          <CommandEmpty>Не найдено.</CommandEmpty>
                          <CommandGroup>
                            {buildings?.map((building) => (
                              <CommandItem
                                value={building.id}
                                key={building.id}
                                onSelect={() => {
                                  form.setValue("buildingId", building.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    building.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {building.name}
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
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-6 py-4">
            <p className="text-base font-semibold">Расположение на карте</p>
            <YandexMap />
          </div>

          <Button
            className="rounded-xl bg-slate-900  mt-2"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Сохранить изменения" : "Создать обьявление"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminAnnoncementForm;
