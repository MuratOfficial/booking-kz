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
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { FilterProps } from "./filter";

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

  const handleDr = () => {
    if (drOpen) {
      setDrOpen(false);
    } else {
      setDrOpen(true);
    }
  };

  return (
    <div className="w-full xs:flex md:flex lg:hidden flex-row gap-2 items-center justify-center">
      <button
        onClick={handleDr}
        className="flex flex-row text-white bg-blue-600 focus:bg-blue-800 gap-2 items-center text-sm rounded-xl py-2 px-3.5"
      >
        Фильтр <Filter className="w-4" />
      </button>
      <button className="flex flex-row text-white bg-slate-600 focus:bg-slate-800 gap-2 items-center text-sm rounded-xl py-2 px-3.5">
        Расш. поиск <SlidersHorizontal className="w-4" />
      </button>
      <button className="flex flex-row text-white bg-red-500 focus:bg-red-700 gap-2 items-center text-sm rounded-xl py-2 px-3.5">
        <FilterX className="w-4" />
      </button>
      <Drawer open={drOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-2">
            <Accordion className="px-4" type="single" collapsible>
              <Separator />
              <AccordionItem value="item-1">
                <AccordionTrigger>Вид аренды</AccordionTrigger>
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
              <Separator />
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {" "}
                  <span
                    className={cn(
                      "font-bold flex cursor-pointer flex-row items-center gap-1 text-slate-900  transition delay-150 duration-500 p-2 hover:text-blue-500 hover: border-b-2 border-transparent",

                      searchParams.get("serviceType") === "Аренда" &&
                        "text-blue-500 "
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    Аренда
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="w-full text-slate-900"></ul>
                </AccordionContent>
              </AccordionItem>
              <Separator />

              <Separator />
            </Accordion>
          </div>
          <DrawerFooter className="w-full items-center flex">
            <Button
              onClick={() => setDrOpen(false)}
              className="bg-slate-100 rounded-xl w-full px-2.5 py-2"
              variant="outline"
            >
              Закрыть
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MobileFilter;
