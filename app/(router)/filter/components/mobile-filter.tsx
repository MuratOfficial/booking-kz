import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Filter,
  FilterX,
  SlidersHorizontal,
  Cloud,
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  UserPlus,
  Users,
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
  Dot,
  Circle,
  BellDot,
  Menu,
  Heart,
  MessageCircle,
  Newspaper,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { FilterProps } from "./filter";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ComboboxFilter } from "./combobox-filter";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function MobileFilter({ allcount, cities }: FilterProps) {
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [categoryStrings, setCategoryStrings] = React.useState<string[]>([]);
  const [moreStrings, setMoreStrings] = React.useState<string[]>([]);

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

  const resetFilter = useDebouncedCallback((param: string) => {
    const params = new URLSearchParams(searchParams);
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
      params.delete("priceNego");
    } else {
      params.delete(param);
    }
    setCategoryStrings([]);
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  function resetFilterItem(value: string) {
    const params = new URLSearchParams(searchParams);
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
    addOrRemoveString(value);
    replace(`${pathname}?${params.toString()}`);
  }

  function resetAllMoreFilter() {
    const params = new URLSearchParams(searchParams);
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

    replace(`${pathname}?${params.toString()}`);
  }

  const handleFilter = useDebouncedCallback((term: string, filter: string) => {
    addOrRemoveMoreString(term);
    addOrRemoveString(term);
    const params = new URLSearchParams(searchParams);
    if (filter === "categoryType") {
      if (term) {
        if (params.has("categoryType", term)) {
          params.delete("categoryType", term);
        } else {
          params.append("categoryType", term);
        }
      } else {
        params.delete("categoryType");
      }
    }
    if (filter === "roomNumber") {
      addOrRemoveString(`r${term}`);
      if (term) {
        if (params.has("roomNumber", term)) {
          params.delete("roomNumber", term);
        } else {
          params.append("roomNumber", term);
        }
      } else {
        params.delete("roomNumber");
      }
    }

    if (filter === "serviceTypeExt") {
      if (term) {
        if (params.has("serviceTypeExt", term)) {
          params.delete("serviceTypeExt", term);
        } else {
          params.append("serviceTypeExt", term);
        }
      } else {
        params.delete("serviceTypeExt");
      }
    }
    if (filter === "priceFrom") {
      if (term) {
        params.set("priceFrom", term);
      } else {
        params.delete("priceFrom");
      }
    }
    if (filter === "priceTo") {
      if (term) {
        params.set("priceTo", term);
      } else {
        params.delete("priceTo");
      }
    }
    if (filter === "priceNego") {
      if (term) {
        if (params.has("priceNego", term)) {
          params.delete("priceNego", term);
        } else {
          params.set("priceNego", term);
        }
      } else {
        params.delete("priceNego");
      }
    }

    if (filter === "areaSqFrom") {
      if (term) {
        params.set("areaSqFrom", term);
      } else {
        params.delete("areaSqFrom");
      }
    }
    if (filter === "areaSqTo") {
      if (term) {
        params.set("areaSqTo", term);
      } else {
        params.delete("areaSqTo");
      }
    }
    if (filter === "cityOrTown") {
      if (term) {
        params.set("cityOrTown", term);
      } else {
        params.delete("cityOrTown");
      }
    }
    if (filter === "street") {
      if (term) {
        params.set("street", term);
      } else {
        params.delete("street");
      }
    }
    if (filter === "map") {
      if (term) {
        if (params.has("map", term)) {
          params.delete("map", term);
        } else {
          params.set("map", term);
        }
      } else {
        params.delete("map");
      }
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const buildingsList = cities
    .filter(
      (el) => el.cityOrDistrict.toLowerCase() === searchParams.get("city")
    )[0]
    ?.buildings?.map((el) => ({
      value: el.id,
      label: el.name,
    }));

  const handleMoreFilter = (term: string, filter: string) => {
    addOrRemoveMoreString(`${filter}=${term}`);

    replace(`${pathname}?${moreStrings.join("&")}`);
  };

  const localeMoreParamsReplace = () => {
    replace(`${pathname}?${moreStrings.join("&")}`);
  };

  const citiesList = cities?.map((el) => ({
    value: el.cityOrDistrict.toLowerCase(),
    label: el.cityOrDistrict,
  }));

  const townList = cities
    .filter(
      (el) => el.cityOrDistrict.toLowerCase() === searchParams.get("city")
    )[0]
    ?.cityOrTown?.map((el) => ({
      value: el.name.toLowerCase(),
      label: el.name,
    }));

  const streetList = cities
    .filter(
      (el) => el.cityOrDistrict.toLowerCase() === searchParams.get("city")
    )[0]
    ?.cityOrTown?.filter(
      (el) => el.name.toLowerCase() === searchParams.get("cityOrTown")
    )[0]
    ?.addresses?.map((el) => ({
      value: el.name.toLowerCase(),
      label: el.name,
    }));

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

  const [drOpen, setDrOpen] = React.useState(false);

  const [type, setType] = React.useState("");

  const handleDr = () => {
    if (!drOpen) {
      setDrOpen(true);
    } else {
      setDrOpen(false);
    }
  };

  return (
    <div className="w-full xs:flex md:flex lg:hidden flex-row gap-2 items-center justify-center">
      <button
        onClick={() => {
          handleDr();
          setType("1");
        }}
        className="flex flex-row text-white bg-blue-600 f gap-2 items-center text-sm rounded-xl py-2 px-3.5"
      >
        Фильтр <Filter className="w-4" />
      </button>
      <button
        onClick={() => {
          handleDr();
          setType("2");
        }}
        className="flex flex-row text-white bg-slate-600 focus:bg-slate-800 gap-2 items-center text-sm rounded-xl py-2 px-3.5"
      >
        Расш. поиск <SlidersHorizontal className="w-4" />
      </button>
      <button
        onClick={() => {
          resetFilter("all");
          resetAllMoreFilter();
        }}
        className="flex flex-row text-white bg-red-500 focus:bg-red-700 gap-2 items-center text-sm rounded-xl py-2 px-3.5"
      >
        <FilterX className="w-4" />
      </button>
      <Drawer open={drOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          {type === "1" && (
            <div className="flex flex-col gap-2">
              <Accordion className="px-4" type="single" collapsible>
                {searchParams.get("serviceType") === "Аренда" && (
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <span className="w-full flex flex-row justify-between items-center">
                        Вид аренды <ChevronDown className="w-4" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-row gap-2 ">
                        {rentType.map((item, index) => (
                          <button
                            onClick={() => handleFilter(item, "serviceTypeExt")}
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
                    </AccordionContent>
                  </AccordionItem>
                )}
                {searchParams.get("serviceType") === "Аренда" && <Separator />}
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <span className="w-full flex flex-row justify-between items-center">
                      {searchParams.get("serviceType")}{" "}
                      <ChevronDown className="w-4" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {(searchParams.get("serviceType") === "Аренда"
                        ? menuList2
                        : menuList1
                      ).map((item, index) => (
                        <button
                          onClick={() =>
                            handleFilter(item.name, "categoryType")
                          }
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
                  </AccordionContent>
                </AccordionItem>

                <Separator />
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <span className="w-full flex flex-row justify-between items-center">
                      Параметры
                      <ChevronDown className="w-4" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-row gap-6 items-center flex-wrap">
                      <div className="flex flex-row items-center">
                        <button
                          onClick={() => handleFilter("1", "roomNumber")}
                          className={cn(
                            "rounded-l-xl aspect-square w-10 text-sm font-semibold hover:text-neutral-50 hover:bg-slate-900 transition delay-100 bg-neutral-50 duration-300 text-slate-900",
                            searchParams.has("roomNumber", "1") &&
                              "text-neutral-50 bg-slate-900",
                            categoryStrings.includes("r1") &&
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
                            categoryStrings.includes("r2") &&
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
                            categoryStrings.includes("r3") &&
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
                            categoryStrings.includes("r4") &&
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
                            categoryStrings.includes("r5+") &&
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
                            // value={searchParams.get("priceFrom") || ""}
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
                            // value={searchParams.get("priceTo") || ""}
                          />
                          <span className="absolute top-3 right-3 text-sm text-slate-500">
                            ₸
                          </span>
                        </div>
                        {searchParams.get("serviceType") === "Продажа" && (
                          <div className="w-fit gap-2 flex flex-row items-center text-sm font-semibold">
                            <Checkbox
                              className="bg-slate-100 shadow-inner "
                              onCheckedChange={() => {
                                handleFilter("true", "priceNego");
                              }}
                            />
                            Торг
                          </div>
                        )}
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
                            // value={searchParams.get("areaSqFrom") || ""}
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
                            // value={searchParams.get("areaSqTo") || ""}
                          />
                          <span className="absolute top-3 right-3 text-sm text-slate-500">
                            м²
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <Separator />
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <span className="w-full flex flex-row justify-between items-center">
                      Город (область), район
                      <ChevronDown className="w-4" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="lg:grid md:flex xs:flex flex-col grid-cols-4 gap-4 items-center flex-wrap">
                      <ComboboxFilter
                        buttonName="Выберите город"
                        commandInputTitle="Поиск города"
                        data={citiesList}
                        filter="city"
                      />
                      <ComboboxFilter
                        buttonName="Выберите город (район)"
                        commandInputTitle="Поиск города (района)"
                        data={townList || []}
                        filter="cityOrTown"
                      />

                      <ComboboxFilter
                        buttonName="Выберите улицу/мкр."
                        commandInputTitle="Поиск улицы/мкр."
                        data={streetList || []}
                        filter="street"
                      />
                      <ComboboxFilter
                        buttonName="Все жилые комплексы"
                        commandInputTitle="Поиск ЖК"
                        data={buildingsList || []}
                        filter="building"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <Separator />
              </Accordion>
            </div>
          )}
          {type === "2" && (
            <div className="flex flex-col gap-2 px-2 h-[60vh] overflow-y-auto">
              <div className="flex flex-col gap-2 col-span-1">
                <div className="flex flex-col ">
                  <p className="font-bold">Спальные места</p>
                  <p>Кровати, диваны</p>
                  <RadioGroup
                    className="mt-2"
                    onValueChange={(e) => {
                      handleMoreFilter(e, "moreBed");
                    }}
                    value={
                      moreStrings.includes("moreBed")
                        ? moreStrings.find((el) => el.includes("moreBed"))
                        : ""
                    }
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
                        handleMoreFilter(e.target.value, "moreFloorFrom");
                      }}
                      // value={searchParams.get("moreFloorFrom") || ""}
                    />{" "}
                    -{" "}
                    <Input
                      className="rounded-xl pr-5"
                      type="number"
                      placeholder="по"
                      onChange={(e) => {
                        handleMoreFilter(e.target.value, "moreFloorTo");
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                      checked={moreStrings.includes("more=Этаж:первый")}
                      onCheckedChange={() =>
                        handleMoreFilter("Этаж:первый", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Первый
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Этаж:не первый")}
                      onCheckedChange={() =>
                        handleMoreFilter("Этаж:не первый", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Не первый
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Этаж:не цоколь")}
                      onCheckedChange={() =>
                        handleMoreFilter("Этаж:не цоколь", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Не цоколь
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Этаж:последний")}
                      onCheckedChange={() =>
                        handleMoreFilter("Этаж:последний", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Последний
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Этаж:не последний")}
                      onCheckedChange={() =>
                        handleMoreFilter("Этаж:не последний", "more")
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
                      checked={moreStrings.includes("more=Ремонт:новое")}
                      onCheckedChange={() =>
                        handleMoreFilter("Ремонт:новое", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Новое
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Ремонт:среднее")}
                      onCheckedChange={() =>
                        handleMoreFilter("Ремонт:среднее", "more")
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
                      checked={moreStrings.includes("more=Ремонт:требуется")}
                      onCheckedChange={() =>
                        handleMoreFilter("Ремонт:требуется", "more")
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
                      checked={moreStrings.includes("more=Без ремонта")}
                      onCheckedChange={() =>
                        handleMoreFilter("Без ремонта", "more")
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
                      checked={moreStrings.includes("more=Низкие потолки")}
                      onCheckedChange={() =>
                        handleMoreFilter("Низкие потолки", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Низкие
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Стандартные потолки")}
                      onCheckedChange={() =>
                        handleMoreFilter("Стандартные потолки", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Стандартные
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Высокие потолки")}
                      onCheckedChange={() =>
                        handleMoreFilter("Высокие потолки", "more")
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
                      checked={moreStrings.includes("more=Интернет wi-fi")}
                      onCheckedChange={() =>
                        handleMoreFilter("Интернет wi-fi", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Интернет wi-fi
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Кондиционер")}
                      onCheckedChange={() =>
                        handleMoreFilter("Кондиционер", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Кондиционер
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=SMART ТВ")}
                      onCheckedChange={() =>
                        handleMoreFilter("SMART ТВ", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      SMART ТВ
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Телевизор")}
                      onCheckedChange={() =>
                        handleMoreFilter("Телевизор", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Телевизор
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Стир. машина")}
                      onCheckedChange={() =>
                        handleMoreFilter("Стир. машина", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Стиральная машина
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Микроволновка")}
                      onCheckedChange={() =>
                        handleMoreFilter("Микроволновка", "more")
                      }
                      className="bg-slate-100 shadow-inner"
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Микроволновка
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      checked={moreStrings.includes("more=Электрочайник")}
                      onCheckedChange={() =>
                        handleMoreFilter("Электрочайник", "more")
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
                      checked={moreStrings.includes(
                        "more=Посуда и принадлежности"
                      )}
                      onCheckedChange={() =>
                        handleMoreFilter("Посуда и принадлежности", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Посуда и принадлежности
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes(
                        "more=Посудамоечная машина"
                      )}
                      onCheckedChange={() =>
                        handleMoreFilter("Посудамоечная машина", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Посудамоечная машина
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Утюг с гл. доской")}
                      onCheckedChange={() =>
                        handleMoreFilter("Утюг с гл. доской", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Утюг с гладильной доской
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Халаты")}
                      onCheckedChange={() => handleMoreFilter("Халаты", "more")}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Халаты
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Полотенца")}
                      onCheckedChange={() =>
                        handleMoreFilter("Полотенца", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Полотенца
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Фен")}
                      onCheckedChange={() => handleMoreFilter("Фен", "more")}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Фен
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Сушилка")}
                      onCheckedChange={() =>
                        handleMoreFilter("Сушилка", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Сушилка для белья
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Балкон, лоджия")}
                      onCheckedChange={() =>
                        handleMoreFilter("Балкон, лоджия", "more")
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
                      checked={moreStrings.includes("more=Парковка")}
                      onCheckedChange={() =>
                        handleMoreFilter("Парковка", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Парковка
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Беседка")}
                      onCheckedChange={() =>
                        handleMoreFilter("Беседка", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Беседка
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Детс. площадка")}
                      onCheckedChange={() =>
                        handleMoreFilter("Детс. площадка", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Детская площадка
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Видеонаблюдение")}
                      onCheckedChange={() =>
                        handleMoreFilter("Видеонаблюдение", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Видеонаблюдение
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes(
                        "more=Охраняемая территория"
                      )}
                      onCheckedChange={() =>
                        handleMoreFilter("Охраняемая территория", "more")
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
                      checked={moreStrings.includes("more=Вид из окна:на море")}
                      onCheckedChange={() =>
                        handleMoreFilter("Вид из окна:на море", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      На море
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes(
                        "more=Вид из окна:част. на море"
                      )}
                      onCheckedChange={() =>
                        handleMoreFilter("Вид из окна:част. на море", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Частично на море
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes(
                        "more=Вид из окна:на город"
                      )}
                      onCheckedChange={() =>
                        handleMoreFilter("Вид из окна:на город", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      На город
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Вид из окна:во двор")}
                      onCheckedChange={() =>
                        handleMoreFilter("Вид из окна:во двор", "more")
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
                      checked={moreStrings.includes("more=Санузел:раздельный")}
                      onCheckedChange={() =>
                        handleMoreFilter("Санузел:раздельный", "more")
                      }
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Раздельный
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      className="bg-slate-100 shadow-inner"
                      checked={moreStrings.includes("more=Санузел:совмещенный")}
                      onCheckedChange={() =>
                        handleMoreFilter("Санузел:совмещенный", "more")
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
                      checked={moreStrings.includes(
                        "more=Санузел:2 с/у и более"
                      )}
                      onCheckedChange={() =>
                        handleMoreFilter("Санузел:2 с/у и более", "more")
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
                      checked={moreStrings.includes("more=Ванна")}
                      onCheckedChange={() => handleMoreFilter("Ванна", "more")}
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
                      checked={moreStrings.includes(
                        "more=Санузел:душев. перегородка"
                      )}
                      onCheckedChange={() =>
                        handleMoreFilter("Санузел:душев. перегородка", "more")
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
                      checked={moreStrings.includes("more=Джакузи")}
                      onCheckedChange={() =>
                        handleMoreFilter("Джакузи", "more")
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
                      checked={moreStrings.includes("more=Бойлер")}
                      onCheckedChange={() => handleMoreFilter("Бойлер", "more")}
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
                      checked={moreStrings.includes("more=Гигиен. душ")}
                      onCheckedChange={() =>
                        handleMoreFilter("Гигиен. душ", "more")
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
                      checked={moreStrings.includes("more=Курение запрещено")}
                      onCheckedChange={() =>
                        handleMoreFilter("Курение запрещено", "more")
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
                      checked={moreStrings.includes("more=Курение разрешено")}
                      onCheckedChange={() =>
                        handleMoreFilter("Курение разрешено", "more")
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
                      checked={moreStrings.includes("more=Вечеринки разрешены")}
                      onCheckedChange={() =>
                        handleMoreFilter("Вечеринки разрешены", "more")
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
                      checked={moreStrings.includes("more=Можно с детьми")}
                      onCheckedChange={() =>
                        handleMoreFilter("Можно с детьми", "more")
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
                      checked={moreStrings.includes("more=Можно с животными")}
                      onCheckedChange={() =>
                        handleMoreFilter("Можно с животными", "more")
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
                      checked={moreStrings.includes("more=Лифт")}
                      onCheckedChange={() => handleMoreFilter("Лифт", "more")}
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
                      checked={moreStrings.includes(
                        "more=Доступ для инвалидов"
                      )}
                      onCheckedChange={() =>
                        handleMoreFilter("Доступ для инвалидов", "more")
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
          )}

          <DrawerFooter className="w-full items-center flex">
            <Button
              onClick={() => setDrOpen(false)}
              className="bg-blue-600 rounded-xl w-full px-2.5 py-2"
            >
              Показать {allcount} обьявления(-е)
            </Button>
            <Button
              onClick={() => {
                if (searchParams.has("city")) {
                  handleFilter("on", "map");
                  setDrOpen(false);
                } else {
                  toast({ title: "Выберите город (область)" });
                }
              }}
              className="flex flex-row gap-x-1 bg-green-600 rounded-xl w-full px-2.5 py-2"
            >
              <MapPin className="w-4" /> Смотреть на карте
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MobileFilter;
