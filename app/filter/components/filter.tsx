"use client";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Bed,
  BedDouble,
  Building2,
  Cuboid,
  DoorOpen,
  Factory,
  Fence,
  Home,
  Hotel,
  LandPlot,
  ParkingSquare,
  Store,
  TentTree,
  Warehouse,
  Bell,
  X,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ComboboxFilter } from "./combobox-filter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

function Filter() {
  const rentType = ["Аренда посуточно", "Аренда помесячно", "Аренда по часам"];
  const [additionalFilter, setAdditionalFilter] = useState([
    "Полотенце",
    "Фен",
    "Ремонт:новое",
    "Халаты",
    "Парковка",
    "Интернет",
    "Джакузи",
    "Бойлер",
    "Полотенце",
    "Фен",
    "Ремонт:новое",
    "Халаты",
    "Парковка",
    "Интернет",
    "Джакузи",
    "Бойлер",
  ]);

  const menuList1 = [
    {
      name: "Квартиры",
      icon: <DoorOpen size={19} />,
    },
    {
      name: "Дома, дачи, коттеджи",
      icon: <Home size={19} />,
    },
    {
      name: "Гаражи",
      icon: <Warehouse size={19} />,
    },
    {
      name: "Паркинги",
      icon: <ParkingSquare size={19} />,
    },
    {
      name: "Земельный участок",
      icon: <LandPlot size={19} />,
    },
    {
      name: "Коммерческая недвижимость",
      icon: <Building2 size={19} />,
    },
    {
      name: "Помещения",
      icon: <Cuboid size={19} />,
    },
    {
      name: "Магазины",
      icon: <Store size={19} />,
    },
    {
      name: "Заводы и промбазы",
      icon: <Factory size={19} />,
    },
    {
      name: "Прочее",
      icon: <Fence size={19} />,
    },
  ];

  const menuList2 = [
    {
      name: "Квартиры, апартаменты",
      icon: <DoorOpen size={19} />,
    },
    {
      name: "Дома, дачи, коттеджи",
      icon: <Home size={19} />,
    },
    {
      name: "Комнаты",
      icon: <BedDouble size={19} />,
    },
    {
      name: "Отели, гостиницы",
      icon: <Hotel size={19} />,
    },
    {
      name: "Глэмпинги, базы отдыха",
      icon: <TentTree size={19} />,
    },
    {
      name: "Хостелы",
      icon: <Bed size={19} />,
    },
    {
      name: "Гаражи",
      icon: <Warehouse size={19} />,
    },
    {
      name: "Паркинги",
      icon: <ParkingSquare size={19} />,
    },
    {
      name: "Коммерческая недвижимость",
      icon: <Building2 size={19} />,
    },
    {
      name: "Помещения",
      icon: <Cuboid size={19} />,
    },
    {
      name: "Магазины",
      icon: <Store size={19} />,
    },
    {
      name: "Промбазы",
      icon: <Factory size={19} />,
    },
    {
      name: "Прочее",
      icon: <Fence size={19} />,
    },
  ];

  const cities = [
    { value: "астана", label: "Астана" },
    { value: "алматы", label: "Алматы" },
    { value: "караганда", label: "Караганда" },
    { value: "шымкент", label: "Шымкент" },
  ];

  return (
    <div className=" bg-gradient-to-br from-blue-500 to-blue-400 px-6 py-4 rounded-3xl w-full flex flex-col gap-4">
      <div className="flex flex-row gap-2 ">
        {rentType.map((item, index) => (
          <button
            key={index}
            className="px-3 py-2 rounded-xl bg-neutral-50 text-slate-900 transition delay-100  duration-300 hover:bg-slate-900 hover:text-neutral-50 text-sm font-semibold"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        {menuList1.map((item, index) => (
          <button
            key={index}
            className="px-3 py-2 flex flex-row gap-x-1 rounded-xl border-2 border-neutral-50 text-neutral-50 transition delay-100 duration-300 hover:bg-neutral-50 hover:text-blue-500 text-sm font-semibold"
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-x-6 items-center">
        <div className="flex flex-row items-center">
          <button className="rounded-l-xl aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900">
            1
          </button>
          <button className=" aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900">
            2
          </button>
          <button className=" aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900">
            3
          </button>
          <button className=" aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900">
            4
          </button>
          <button className="rounded-r-xl aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900">
            5+
          </button>
          <p className="text-slate-900 font-semibold text-sm pl-2">
            {" "}
            комнатные
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="w-40 h-10 relative">
            <Input
              className="rounded-xl pr-5"
              type="number"
              placeholder="Цена от"
            />
            <span className="absolute top-3 right-3 text-sm text-slate-500">
              ₸
            </span>
          </div>{" "}
          -
          <div className="w-40 h-10 relative">
            <Input
              className="rounded-xl pr-5"
              type="number"
              placeholder="Цена до"
            />
            <span className="absolute top-3 right-3 text-sm text-slate-500">
              ₸
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="w-40 h-10 relative">
            <Input
              className="rounded-xl pr-5"
              type="number"
              placeholder="Площадь от"
            />
            <span className="absolute top-3 right-3 text-sm text-slate-500">
              м²
            </span>
          </div>{" "}
          -
          <div className="w-40 h-10 relative ">
            <Input
              className="rounded-xl pr-5"
              type="number"
              placeholder="Площадь до"
            />
            <span className="absolute top-3 right-3 text-sm text-slate-500">
              м²
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-4 items-center">
        <ComboboxFilter
          buttonName="Выберите город"
          commandInputTitle="Поиск города"
          data={cities}
        />
        <ComboboxFilter
          buttonName="Выберите район"
          commandInputTitle="Поиск района"
          data={cities}
        />
        <ComboboxFilter
          buttonName="Укажите ул., мкр."
          commandInputTitle="Поиск ул., мкр."
          data={cities}
        />
        <ComboboxFilter
          buttonName="Все жилые комплексы"
          commandInputTitle="Поиск ЖК"
          data={cities}
        />
      </div>
      <div className="flex flex-row gap-x-4 justify-between items-center">
        <div className="flex flex-row gap-x-4 items-center">
          {" "}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex flex-row  text-sm font-semibold text-neutral-50 items-center hover:text-slate-900 transition-all delay-75 duration-200">
                <ChevronDown size={16} /> Расширенный поиск
              </button>
            </DialogTrigger>
            <DialogContent className="w-full rounded-xl h-[95%] flex flex-col ">
              <ScrollArea className="w-full h-[95%] border-b-2 pb-1">
                <div className="grid grid-cols-3 gap-4 text-sm  grid-flow-row w-full">
                  <div className="flex flex-col gap-2 col-span-1">
                    <div className="flex flex-col ">
                      <p className="font-bold">Спальные места</p>
                      <p>Кровати, диваны</p>
                      <RadioGroup defaultValue="comfortable" className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="default"
                            id="r1"
                            className=" caret-blue-500  text-blue-500"
                          />
                          <Label htmlFor="r1">Неважно</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="comfortable"
                            id="r2"
                            className=" caret-blue-500 text-blue-500"
                          />
                          <Label htmlFor="r2">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="compact"
                            id="r3"
                            className=" caret-blue-500 text-blue-500"
                          />
                          <Label htmlFor="r3">3</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="4"
                            id="r4"
                            className=" caret-blue-500 text-blue-500"
                          />
                          <Label htmlFor="r4">4 и более</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Этаж</p>
                      <div className="flex flex-row items-center gap-2 mt-2 px-1">
                        <Input
                          className="rounded-xl pr-5"
                          type="number"
                          placeholder="с"
                        />{" "}
                        -{" "}
                        <Input
                          className="rounded-xl pr-5"
                          type="number"
                          placeholder="по"
                        />
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Первый
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Не первый
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Не цоколь
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Последний
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Не последний
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Состояние ремонта</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Новое
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Среднее
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Требуется ремонт
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Без ремонта
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Высота потолков</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Низкие
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Стандартные
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Высокие
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 col-span-1">
                    <div className="flex flex-col ">
                      <p className="font-bold">В квартире</p>

                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Интернет wi-fi
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Кондиционер
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          SMART ТВ
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Телевизор
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Стиральная машина
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Микроволновка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Электрочайник
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Посуда и принадлежности
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Посудамоечная машина
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Утюг с гладильной доской
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Халаты
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Полотенца
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Фен
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Сушилка для белья
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Балкон, лоджия
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">На территории</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Парковка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Беседка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Детская площадка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Видеонаблюдение
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Охранная территория
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 col-span-1">
                    <div className="flex flex-col ">
                      <p className="font-bold">Вид из окна</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          На море
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Частично на море
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          На город
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Вид во двор
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Санузел</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Раздельный
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Совмещенный
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          2 санузла и более
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Ванна
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Душевая перегородка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Джакузи
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Бойлер
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Гигиенический душ
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Правила заселения</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Курение запрещено
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Курение разрешено
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Вечеринки разрешены
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Можно с детьми
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Можно с животными
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Дополнительно</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Лифт
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          id="terms"
                          className="bg-slate-100 shadow-inner"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Доступ для инвалидов
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter className="flex flex-row gap-x-4 items-center h-fit items-end w-full ">
                <button className="flex flex-row gap-x-1 text-sm px-3.5 py-2.5 rounded-xl hover:border-slate-900 border-2 font-semibold text-slate-800 items-center hover:text-slate-900 transition-all delay-75 duration-200">
                  <X size={16} /> Сбросить
                </button>
                <button className="flex flex-row px-4 py-3 rounded-xl bg-neutral-900 text-sm font-semibold text-neutral-50 items-center opacity-100 hover:opacity-80 transition-all delay-75 duration-200">
                  Показать 202 обьявления
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button className="flex flex-row  text-sm font-semibold text-neutral-50 items-center hover:text-slate-900 transition-all delay-75 duration-200">
            <X size={16} /> Сбросить
          </button>
        </div>
        <div className="flex flex-row gap-x-4 items-center">
          <button className="flex flex-row gap-x-1 text-sm px-3.5 py-2.5 rounded-xl hover:border-slate-900 border-2 font-semibold text-neutral-50 items-center hover:text-slate-900 transition-all delay-75 duration-200">
            <MapPin size={16} /> Смотреть на карте
          </button>
          <button className="flex flex-row px-4 py-3 rounded-xl bg-neutral-900 text-sm font-semibold text-neutral-50 items-center opacity-100 hover:opacity-80 transition-all delay-75 duration-200">
            Показать 202 обьявления
          </button>
        </div>
      </div>

      {additionalFilter.length > 0 && (
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row justify-between text-sm ">
            <p className="text-neutral-50">Ваши фильтры</p>
            <button
              onClick={() => setAdditionalFilter([])}
              className="text-slate-900 font-semibold hover:text-neutral-50 transition-all delay-100 duration-300"
            >
              Сбросить фильтры
            </button>
          </div>
          <div className="flex flex-row gap-2 flex-wrap items-center">
            {additionalFilter.map((filter, ind) => (
              <div
                key={ind}
                className="rounded-full text-slate-900 py-2 text-xs px-3 bg-neutral-50 flex flex-row items-center gap-x-1"
              >
                {filter}
                <button
                  className="hover:opacity-75"
                  onClick={() =>
                    setAdditionalFilter(
                      additionalFilter.filter((el) => el !== filter)
                    )
                  }
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
