"use client";
import React, { Suspense, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link as ScrollLink } from "react-scroll";
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
  Loader,
  Loader2,
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface FilterProps {
  allcount: number;
}

function Filter({ allcount }: FilterProps) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [categoryStrings, setCategoryStrings] = useState<string[]>([]);
  const [moreStrings, setMoreStrings] = useState<string[]>([]);

  const addOrRemoveString = (newString: string): void => {
    const stringIndex: number = categoryStrings.indexOf(newString);
    if (stringIndex === -1) {
      setCategoryStrings([...categoryStrings, newString]);
    } else {
      const updatedStrings: string[] = [...categoryStrings];
      updatedStrings.splice(stringIndex, 1);
      setCategoryStrings(updatedStrings);
    }
  };

  const addOrRemoveMoreString = (newString: string): void => {
    const stringIndex: number = moreStrings.indexOf(newString);
    if (stringIndex === -1) {
      setMoreStrings([...moreStrings, newString]);
    } else {
      const updatedStrings: string[] = [...moreStrings];
      updatedStrings.splice(stringIndex, 1);
      setMoreStrings(updatedStrings);
    }
  };

  function resetFilter(param: string) {
    if (param === "all") {
      params.delete("categoryType");
      params.delete("roomNumber");
      params.delete("serviceTypeExt");
      params.delete("priceFrom");
      params.delete("priceTo");
      params.delete("areaSqFrom");
      params.delete("areaSqTo");
      params.delete("building");
      params.delete("area");
      params.delete("address");
      params.delete("city");
    } else {
      params.delete(param);
    }
    setCategoryStrings([]);

    // replace(`${pathname}?${params.toString()}`);
    return params;
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  function resetFilterItem(value: string) {
    if (params.has("more", value)) {
      params.delete("more", value);
    }
    if (params.has("moreBed", value)) {
      params.delete("moreBed", value);
    }
    if (params.has("moreFloorTo", value)) {
      params.delete("moreFloorTo", value);
    }
    if (params.has("moreFloorFrom", value)) {
      params.delete("moreFloorFrom", value);
    }
    addOrRemoveMoreString(value);
    // replace(`${pathname}?${params.toString()}`);
    return params;
  }

  function resetAllMoreFilter() {
    if (params.has("more")) {
      params.delete("more");
    }
    if (params.has("moreBed")) {
      params.delete("moreBed");
    }
    if (params.has("moreFloorTo")) {
      params.delete("moreFloorTo");
    }
    if (params.has("moreFloorFrom")) {
      params.delete("moreFloorFrom");
    }
    setMoreStrings([]);
    // replace(`${pathname}?${params.toString()}`);
    return params;
  }

  function handleFilter(term: string, filter: string) {
    if (filter === "categoryType") {
      if (term) {
        if (params.has("categoryType", term)) {
          params.delete("categoryType", term);
          addOrRemoveString(term);
        } else {
          params.append("categoryType", term);
          addOrRemoveString(term);
        }
      } else {
        params.delete("categoryType");
        addOrRemoveString(term);
      }
    }
    if (filter === "roomNumber") {
      if (term) {
        if (params.has("roomNumber", term)) {
          params.delete("roomNumber", term);
          addOrRemoveString(`roomNumber:${term}`);
        } else {
          params.append("roomNumber", term);
          addOrRemoveString(`roomNumber:${term}`);
        }
      } else {
        params.delete("roomNumber");
        addOrRemoveString(`roomNumber:${term}`);
      }
    }
    if (filter === "more") {
      if (term) {
        if (params.has("more", term)) {
          params.delete("more", term);
          addOrRemoveString(term);
        } else {
          params.append("more", term);
          addOrRemoveString(term);
        }
      } else {
        params.delete("more");
        addOrRemoveString(term);
      }
    }
    if (filter === "serviceTypeExt") {
      if (term) {
        if (params.has("serviceTypeExt", term)) {
          params.delete("serviceTypeExt", term);
          addOrRemoveString(`serviceTypeExt:${term}`);
        } else {
          params.append("serviceTypeExt", term);
          addOrRemoveString(`serviceTypeExt:${term}`);
        }
      } else {
        params.delete("serviceTypeExt");
        addOrRemoveString(`serviceTypeExt:${term}`);
      }
    }
    if (filter === "priceFrom") {
      if (term) {
        params.set("priceFrom", term);
        addOrRemoveString(`priceFrom:${term}`);
      } else {
        params.delete("priceFrom");
        addOrRemoveString(`priceFrom:${term}`);
      }
    }
    if (filter === "priceTo") {
      if (term) {
        params.set("priceTo", term);
        addOrRemoveString(`priceTo:${term}`);
      } else {
        params.delete("priceTo");
        addOrRemoveString(`priceTo:${term}`);
      }
    }
    if (filter === "moreFloorTo") {
      if (term) {
        params.set("moreFloorTo", term);
        addOrRemoveMoreString(`moreFloorTo:${term}`);
      } else {
        params.delete("moreFloorTo");
        addOrRemoveMoreString(`moreFloorTo:${term}`);
      }
    }
    if (filter === "moreBed") {
      if (term) {
        params.set("moreBed", term);
        addOrRemoveMoreString(`moreFloorTo:${term}`);
      } else {
        params.delete("moreBed");
        addOrRemoveMoreString(`moreFloorTo:${term}`);
      }
    }
    if (filter === "moreFloorFrom") {
      if (term) {
        params.set("moreFloorFrom", term);
        addOrRemoveMoreString(`moreFloorTo:${term}`);
      } else {
        params.delete("moreFloorFrom");
        addOrRemoveMoreString(`moreFloorTo:${term}`);
      }
    }
    if (filter === "areaSqFrom") {
      if (term) {
        params.set("areaSqFrom", term);
        addOrRemoveString(`areaSqFrom:${term}`);
      } else {
        params.delete("areaSqFrom");
        addOrRemoveString(`areaSqFrom:${term}`);
      }
    }
    if (filter === "areaSqTo") {
      if (term) {
        params.set("areaSqTo", term);
        addOrRemoveString(`areaSqTo:${term}`);
      } else {
        params.delete("areaSqTo");
        addOrRemoveString(`areaSqTo:${term}`);
      }
    }

    return params;
  }

  const citiesList = [
    {
      value: "астана",
      label: "Астана",
    },
    {
      value: "алматы",
      label: "Алматы",
    },
    {
      value: "шымкент",
      label: "Шымкент",
    },
    {
      value: "актобе",
      label: "Актобе",
    },
    {
      value: "актау",
      label: "Актау",
    },
    {
      value: "атырау",
      label: "Атырау",
    },
    {
      value: "караганда",
      label: "Караганда",
    },
    {
      value: "кызылорда",
      label: "Кызылорда",
    },
    {
      value: "талдыкорган",
      label: "Талдыкорган",
    },
    {
      value: "жезказган",
      label: "Жезказган",
    },
    {
      value: "экибастуз",
      label: "Экибастуз",
    },
    {
      value: "семей",
      label: "Семей",
    },
    {
      value: "усть-Каменогорск",
      label: "Усть-Каменогорск",
    },
    {
      value: "костанай",
      label: "Костанай",
    },
    {
      value: "уральск",
      label: "Уральск",
    },
    {
      value: "петропавловск",
      label: "Петропавловск",
    },
    {
      value: "туркестан",
      label: "Туркестан",
    },
    {
      value: "павлодар",
      label: "Павлодар",
    },
    {
      value: "кокшетау",
      label: "Кокшетау",
    },
    {
      value: "актюбинская обл.",
      label: "Актюбинская обл.",
    },
    {
      value: "алматинская обл.",
      label: "Алматинская обл.",
    },
    {
      value: "атырауская обл.",
      label: "Атырауская обл.",
    },
    {
      value: "жамбылская обл.",
      label: "Жамбылская обл.",
    },
    {
      value: "акмолинская обл.",
      label: "Акмолинская обл.",
    },
    {
      value: "восточно-Казахстанская обл.",
      label: "Восточно-Казахстанская обл.",
    },
    {
      value: "западно-Казахстанская обл.",
      label: "Западно-Казахстанская обл.",
    },
    {
      value: "карагандинская обл.",
      label: "Карагандинская обл.",
    },
    {
      value: "костанайская обл.",
      label: "Костанайская обл.",
    },
    {
      value: "кызылординская обл.",
      label: "Кызылординская обл.",
    },
    {
      value: "мангистауская обл.",
      label: "Мангистауская обл.",
    },
    {
      value: "павлодарская обл.",
      label: "Павлодарская обл.",
    },
    {
      value: "северо-Казахстанская обл.",
      label: "Северо-Казахстанская обл.",
    },
    {
      value: "туркестанская обл.",
      label: "Туркестанская обл.",
    },
    {
      value: "абайская обл.",
      label: "Абайская обл.",
    },
    {
      value: "жетысуйская обл.",
      label: "Жетысуйская обл.",
    },
    {
      value: "улытауская обл.",
      label: "Улытауская обл.",
    },
  ];

  const rentType = ["Посуточно", "Помесячно", "Почасовая"];

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

  return (
    <div className=" bg-gradient-to-br from-blue-500 to-blue-400 px-6 py-4 rounded-3xl w-full flex flex-col gap-4">
      {searchParams.get("serviceType") === "Аренда" && (
        <div className="flex flex-row gap-2 ">
          {rentType.map((item, index) => (
            <button
              onClick={() => {
                handleFilter(item, "serviceTypeExt");
              }}
              key={index}
              className={cn(
                "px-3.5 py-2.5 rounded-xl bg-neutral-50 text-slate-900 transition delay-100  duration-300 hover:bg-slate-900 hover:text-neutral-50 text-sm font-semibold",
                categoryStrings.includes(item) &&
                  "text-neutral-50 bg-slate-900",
                searchParams.has("serviceTypeExt", item) &&
                  "text-neutral-50 bg-slate-900"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-row gap-2 flex-wrap">
        {(searchParams.get("serviceType") === "Аренда"
          ? menuList2
          : menuList1
        ).map((item, index) => (
          <button
            onClick={() => handleFilter(item.name, "categoryType")}
            key={index}
            className={cn(
              "px-3.5 py-2.5 flex flex-row gap-x-1 rounded-xl  text-slate-900 transition delay-100 duration-300 bg-neutral-50 hover:text-neutral-50 hover:bg-slate-900 text-sm font-semibold",
              searchParams.has("categoryType", item.name) &&
                "text-neutral-50 bg-slate-900",
              categoryStrings.includes(item.name) &&
                "text-neutral-50 bg-slate-900"
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-6 items-center flex-wrap">
        <div className="flex flex-row items-center">
          <button
            onClick={() => handleFilter("1", "roomNumber")}
            className={cn(
              "rounded-l-xl aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900",
              searchParams.has("roomNumber", "1") &&
                "text-neutral-50 bg-slate-900",
              categoryStrings.includes("roomNumber:1") &&
                "text-neutral-50 bg-slate-900"
            )}
          >
            1
          </button>
          <button
            onClick={() => handleFilter("2", "roomNumber")}
            className={cn(
              " aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900",
              searchParams.has("roomNumber", "2") &&
                "text-neutral-50 bg-slate-900",
              categoryStrings.includes("roomNumber:2") &&
                "text-neutral-50 bg-slate-900"
            )}
          >
            2
          </button>
          <button
            onClick={() => handleFilter("3", "roomNumber")}
            className={cn(
              " aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900",
              searchParams.has("roomNumber", "3") &&
                "text-neutral-50 bg-slate-900",
              categoryStrings.includes("roomNumber:3") &&
                "text-neutral-50 bg-slate-900"
            )}
          >
            3
          </button>
          <button
            onClick={() => handleFilter("4", "roomNumber")}
            className={cn(
              " aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900",
              searchParams.has("roomNumber", "4") &&
                "text-neutral-50 bg-slate-900",
              categoryStrings.includes("roomNumber:4") &&
                "text-neutral-50 bg-slate-900"
            )}
          >
            4
          </button>
          <button
            onClick={() => handleFilter("5+", "roomNumber")}
            className={cn(
              "rounded-r-xl aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900",
              searchParams.has("roomNumber", "5+") &&
                "text-neutral-50 bg-slate-900",
              categoryStrings.includes("roomNumber:5+") &&
                "text-neutral-50 bg-slate-900"
            )}
          >
            5+
          </button>
          <p className="text-slate-900 font-semibold text-sm pl-2">
            {" "}
            комнатные
          </p>
        </div>
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <div className="w-40 h-10 relative">
            <Input
              className="rounded-xl pr-5"
              type="number"
              placeholder="Цена от"
              onChange={(e) => {
                handleFilter(e.target.value, "priceFrom");
              }}
              value={searchParams.get("priceFrom") || ""}
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
              onChange={(e) => {
                handleFilter(e.target.value, "priceTo");
              }}
              value={searchParams.get("priceTo") || ""}
            />
            <span className="absolute top-3 right-3 text-sm text-slate-500">
              ₸
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <div className="w-40 h-10 relative">
            <Input
              className="rounded-xl pr-5"
              type="number"
              placeholder="Площадь от"
              onChange={(e) => {
                handleFilter(e.target.value, "areaSqFrom");
              }}
              value={searchParams.get("areaSqFrom") || ""}
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
              onChange={(e) => {
                handleFilter(e.target.value, "areaSqTo");
              }}
              value={searchParams.get("areaSqTo") || ""}
            />
            <span className="absolute top-3 right-3 text-sm text-slate-500">
              м²
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center flex-wrap">
        <ComboboxFilter
          buttonName="Выберите город"
          commandInputTitle="Поиск города"
          data={citiesList}
          filter="city"
        />
        <ComboboxFilter
          buttonName="Выберите район"
          commandInputTitle="Поиск района"
          data={[]}
          filter="area"
        />
        <ComboboxFilter
          buttonName="Укажите ул., мкр."
          commandInputTitle="Поиск ул., мкр."
          data={[]}
          filter="address"
        />
        <ComboboxFilter
          buttonName="Все жилые комплексы"
          commandInputTitle="Поиск ЖК"
          data={[]}
          filter="building"
        />
      </div>
      <div className="flex flex-row gap-x-4 justify-between items-center">
        <div className="flex flex-row gap-x-4 items-center">
          {" "}
          <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
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
                      <RadioGroup
                        className="mt-2"
                        onValueChange={(e) => {
                          handleFilter(e, "moreBed");
                        }}
                        value={searchParams.get("moreBed") || ""}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Спальные места:неважно"
                            id="r1"
                            className=" caret-blue-500  text-blue-500"
                          />
                          <Label htmlFor="r1">Неважно</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Спальные места:2"
                            id="r2"
                            className=" caret-blue-500 text-blue-500"
                          />
                          <Label htmlFor="r2">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Спальные места:3"
                            id="r3"
                            className=" caret-blue-500 text-blue-500"
                          />
                          <Label htmlFor="r3">3</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Спальные места:4 и более"
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
                          onChange={(e) => {
                            handleFilter(e.target.value, "moreFloorFrom");
                          }}
                          value={searchParams.get("moreFloorFrom") || ""}
                        />{" "}
                        -{" "}
                        <Input
                          className="rounded-xl pr-5"
                          type="number"
                          placeholder="по"
                          onChange={(e) => {
                            handleFilter(e.target.value, "moreFloorTo");
                          }}
                          value={searchParams.get("moreFloorTo") || ""}
                        />
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          checked={searchParams.has("more", "Этаж:первый")}
                          onCheckedChange={() =>
                            handleFilter("Этаж:первый", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Первый
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Этаж:не первый")}
                          onCheckedChange={() =>
                            handleFilter("Этаж:не первый", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Не первый
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Этаж:не цоколь")}
                          onCheckedChange={() =>
                            handleFilter("Этаж:не цоколь", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Не цоколь
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Этаж:последний")}
                          onCheckedChange={() =>
                            handleFilter("Этаж:последний", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Последний
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has(
                            "more",
                            "Этаж:не последний"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Этаж:не последний", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Не последний
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Состояние ремонта</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          checked={searchParams.has("more", "Ремонт:новое")}
                          onCheckedChange={() =>
                            handleFilter("Ремонт:новое", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Новое
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Ремонт:среднее")}
                          onCheckedChange={() =>
                            handleFilter("Ремонт:среднее", "more")
                          }
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
                          checked={searchParams.has("more", "Ремонт:требуется")}
                          onCheckedChange={() =>
                            handleFilter("Ремонт:требуется", "more")
                          }
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
                          checked={searchParams.has("more", "Без ремонта")}
                          onCheckedChange={() =>
                            handleFilter("Без ремонта", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Без ремонта
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Высота потолков</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          checked={searchParams.has("more", "Низкие потолки")}
                          onCheckedChange={() =>
                            handleFilter("Низкие потолки", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Низкие
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has(
                            "more",
                            "Стандартные потолки"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Стандартные потолки", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Стандартные
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Высокие потолки")}
                          onCheckedChange={() =>
                            handleFilter("Высокие потолки", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                          checked={searchParams.has("more", "Интернет wi-fi")}
                          onCheckedChange={() =>
                            handleFilter("Интернет wi-fi", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Интернет wi-fi
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Кондиционер")}
                          onCheckedChange={() =>
                            handleFilter("Кондиционер", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Кондиционер
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "SMART ТВ")}
                          onCheckedChange={() =>
                            handleFilter("SMART ТВ", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          SMART ТВ
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Телевизор")}
                          onCheckedChange={() =>
                            handleFilter("Телевизор", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Телевизор
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Стир. машина")}
                          onCheckedChange={() =>
                            handleFilter("Стир. машина", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Стиральная машина
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Микроволновка")}
                          onCheckedChange={() =>
                            handleFilter("Микроволновка", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Микроволновка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={searchParams.has("more", "Электрочайник")}
                          onCheckedChange={() =>
                            handleFilter("Электрочайник", "more")
                          }
                          className="bg-slate-100 shadow-inner"
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Электрочайник
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Посуда и принадлежности"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Посуда и принадлежности", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Посуда и принадлежности
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Посудамоечная машина"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Посудамоечная машина", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Посудамоечная машина
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Утюг с гл. доской"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Утюг с гл. доской", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Утюг с гладильной доской
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Халаты")}
                          onCheckedChange={() => handleFilter("Халаты", "more")}
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Халаты
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Полотенца")}
                          onCheckedChange={() =>
                            handleFilter("Полотенца", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Полотенца
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Фен")}
                          onCheckedChange={() => handleFilter("Фен", "more")}
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Фен
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Сушилка")}
                          onCheckedChange={() =>
                            handleFilter("Сушилка", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Сушилка для белья
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Балкон, лоджия")}
                          onCheckedChange={() =>
                            handleFilter("Балкон, лоджия", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Балкон, лоджия
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">На территории</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Парковка")}
                          onCheckedChange={() =>
                            handleFilter("Парковка", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Парковка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Беседка")}
                          onCheckedChange={() =>
                            handleFilter("Беседка", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Беседка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Детс. площадка")}
                          onCheckedChange={() =>
                            handleFilter("Детс. площадка", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Детская площадка
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Видеонаблюдение")}
                          onCheckedChange={() =>
                            handleFilter("Видеонаблюдение", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Видеонаблюдение
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Охраняемая территория"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Охраняемая территория", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Охраняемая территория
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 col-span-1">
                    <div className="flex flex-col ">
                      <p className="font-bold">Вид из окна</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Вид из окна:на море"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Вид из окна:на море", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          На море
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Вид из окна:част. на море"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Вид из окна:част. на море", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Частично на море
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Вид из окна:на город"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Вид из окна:на город", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          На город
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Вид из окна:во двор"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Вид из окна:во двор", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Вид во двор
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <p className="font-bold">Санузел</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Санузел:раздельный"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Санузел:раздельный", "more")
                          }
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Раздельный
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Санузел:совмещенный"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Санузел:совмещенный", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Санузел:2 с/у и более"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Санузел:2 с/у и более", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Ванна")}
                          onCheckedChange={() => handleFilter("Ванна", "more")}
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Санузел:душев. перегородка"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Санузел:душев. перегородка", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Джакузи")}
                          onCheckedChange={() =>
                            handleFilter("Джакузи", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Бойлер")}
                          onCheckedChange={() => handleFilter("Бойлер", "more")}
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Гигиен. душ")}
                          onCheckedChange={() =>
                            handleFilter("Гигиен. душ", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Курение запрещено"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Курение запрещено", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Курение разрешено"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Курение разрешено", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Вечеринки разрешены"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Вечеринки разрешены", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Можно с детьми")}
                          onCheckedChange={() =>
                            handleFilter("Можно с детьми", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Можно с животными"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Можно с животными", "more")
                          }
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has("more", "Лифт")}
                          onCheckedChange={() => handleFilter("Лифт", "more")}
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
                          className="bg-slate-100 shadow-inner"
                          checked={searchParams.has(
                            "more",
                            "Доступ для инвалидов"
                          )}
                          onCheckedChange={() =>
                            handleFilter("Доступ для инвалидов", "more")
                          }
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
                <button
                  onClick={() => resetAllMoreFilter()}
                  className="flex flex-row gap-x-1 text-sm px-3.5 py-2.5 rounded-xl hover:border-slate-900 border-2 font-semibold text-slate-800 items-center hover:text-slate-900 transition-all delay-75 duration-200"
                >
                  <X size={16} /> Сбросить
                </button>
                <button
                  onClick={() => setDialogOpen(false)}
                  className="flex flex-row px-4 py-3 rounded-xl bg-blue-500 text-sm font-semibold text-neutral-50 items-center opacity-100 hover:opacity-80 transition-all delay-75 duration-200"
                >
                  Показать {allcount} обьявления
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button
            onClick={() => resetFilter("all")}
            className="flex flex-row  text-sm font-semibold text-neutral-50 items-center hover:text-slate-900 transition-all delay-75 duration-200"
          >
            <X size={16} /> Сбросить
          </button>
        </div>
        <div className="flex flex-row gap-x-4 items-center">
          <button className="flex flex-row gap-x-1 text-sm px-3.5 py-2.5 rounded-xl hover:border-slate-900 border-2 font-semibold text-neutral-50 items-center hover:text-slate-900 transition-all delay-75 duration-200">
            <MapPin size={16} /> Смотреть на карте
          </button>
          <button
            onClick={() => {
              replace(`${pathname}?${params.toString()}`);
              console.log(`${pathname}?${params.toString()}`);
            }}
            className="flex flex-row cursor-pointer  px-4 py-3 rounded-xl bg-slate-900 text-sm font-semibold text-neutral-50 items-center opacity-100 hover:opacity-80 transition-all delay-75 duration-200"
          >
            Показать{" "}
            <span className="mx-1">
              <Suspense fallback={<Loader2 className="w-4 animate-spin" />}>
                {allcount}
              </Suspense>
            </span>{" "}
            обьявления
          </button>
        </div>
      </div>

      {[
        ...searchParams.getAll("more"),
        ...searchParams.getAll("moreBed"),
        ...searchParams.getAll("moreFloorTo"),
        ...searchParams.getAll("moreFloorFrom"),
      ].length > 0 && (
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row justify-between text-sm ">
            <p className="text-neutral-50">Ваши фильтры</p>
            <button
              onClick={() => {
                resetAllMoreFilter();
              }}
              className="text-slate-900 font-semibold hover:text-neutral-50 transition-all delay-100 duration-300"
            >
              Сбросить фильтры
            </button>
          </div>
          <div className="flex flex-row gap-2 flex-wrap items-center">
            {[
              ...searchParams.getAll("more"),
              ...searchParams.getAll("moreBed"),
              ...searchParams.getAll("moreFloorTo"),
              ...searchParams.getAll("moreFloorFrom"),
            ].map((filter, ind) => (
              <div
                key={ind}
                className="rounded-full text-slate-900 py-1.5 text-xs px-3 bg-neutral-50 flex flex-row items-center gap-x-1"
              >
                {searchParams.has("moreFloorTo", filter)
                  ? `Этаж по:${filter}`
                  : searchParams.has("moreFloorFrom", filter)
                  ? `Этаж с:${filter}`
                  : filter}
                <button
                  className="hover:opacity-75"
                  onClick={() => resetFilterItem(filter)}
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
