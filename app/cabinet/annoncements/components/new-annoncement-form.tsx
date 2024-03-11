"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  ImagePlus,
  Info,
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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
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
    .min(1900, { message: "Год должен состоят из 4 цифр." })
    .max(new Date().getFullYear(), {
      message: "Год должен быть меньше текущего",
    })
    .optional(),
  price: z.coerce.number({ required_error: "Укажите цену" }),
  priceNego: z.boolean().default(false),
  description: z
    .string()
    .min(75, "Не должно быть больше 75 знаков")
    .max(2000, "Не должно превышать 2000 знаков"),
  comeIn: z.string().optional(),
  comeOut: z.string().optional(),
});

function NewAnnoncementForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      serviceType: "",
      categoryType: "",
      serviceTypeExt: "",
      roomNumber: 1,
      floor: 1,
      floorFrom: 1,
      areaSq: 0,
      yearBuild: 2013,
      price: 0,
      comeIn: "14:00",
      comeOut: "12:00",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
      value: "После 24:00",
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

  return (
    <div className="w-full flex flex-col gap-2 text-slate-900">
      <h1 className="text-2xl font-semibold ml-4">Новое обьявление</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base font-semibold">
                      Вид обьявления
                    </FormLabel>
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
                      <FormLabel className="text-base font-semibold">
                        Категория недвижимости
                      </FormLabel>
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
                        <FormLabel className="text-base font-semibold">
                          Категория недвижимости
                        </FormLabel>
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
                        <FormLabel className="text-base font-semibold">
                          Вид аренды
                        </FormLabel>
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
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl px-4 pt-4 pb-2">
            <div className="flex flex-row items-center">
              <button className="rounded-xl aspect-square  h-36 bg-blue-400 flex flex-col justify-center items-center">
                <ImagePlus className="w-6 stroke-white" />
              </button>
            </div>
            <p className="text-slate-400 text-xs font-medium flex flex-row gap-x-1 items-center ">
              <Info className="w-3" />
              Загрузите изображения для получения большого количества просмотров
            </p>
          </div>
          <div className="w-full flex flex-row items-center justify-between gap-8">
            <div className="flex flex-row items-start justify-between p-4 rounded-xl gap-8 bg-white w-full">
              <div className="flex flex-col gap-2  justify-between w-fit">
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-semibold">
                        Комнатность
                      </FormLabel>
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
                              {el}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
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
                />
              </div>

              <div className="flex flex-col gap-2 items-center">
                <FormLabel className="text-base font-semibold">Этаж</FormLabel>
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
                    <FormLabel className="text-base font-semibold">
                      Площадь
                    </FormLabel>
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
            <div className="w-fit bg-white p-4 rounded-xl h-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel className="text-base font-semibold">
                      Цена
                    </FormLabel>
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
              <FormField
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
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl p-4">
            <div className="grid grid-cols-3 justify-between gap-4">
              <FormField
                control={form.control}
                name="repairType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base font-semibold">
                      Состояние ремонта
                    </FormLabel>
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
                    <FormLabel className="text-base font-semibold">
                      Высота потолков
                    </FormLabel>
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
                    <FormLabel className="text-base font-semibold">
                      Площадь
                    </FormLabel>
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
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl p-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Описание
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Опишите максимально подробно, это позволит пользователям задавать вам меньше вопросов"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2 bg-white rounded-xl p-4">
            <FormLabel className="text-base font-semibold">
              Правила заселения
            </FormLabel>
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
                            {field.value
                              ? comeTime.find(
                                  (item) => item.value === field.value
                                )?.value
                              : "Выберите кат. недвижимости"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0 h-[280px] overflow-y-auto ">
                          <Command>
                            <CommandGroup>
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

          <button type="submit">Submit</button>
        </form>
      </Form>
    </div>
  );
}

export default NewAnnoncementForm;
