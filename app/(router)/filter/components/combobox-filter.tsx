"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface ComboboxFilterProps {
  buttonName: string;
  commandInputTitle: string;
  data: {
    value: string;
    label: string;
  }[];
  filter: string;
}

export function ComboboxFilter({
  buttonName,
  commandInputTitle,
  data,
  filter,
}: ComboboxFilterProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = useDebouncedCallback((term: string, filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter === filter) {
      if (term) {
        if (params.has(filter, term)) {
          params.delete(filter, term);
        } else {
          params.set(filter, term);
        }
      } else {
        params.delete(filter);
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between rounded-xl "
        >
          <span className="line-clamp-1 w-[240px]">
            {searchParams.getAll(filter).length > 0
              ? data?.find((item) =>
                  searchParams.getAll(filter).includes(item.value)
                )?.label
              : buttonName}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] max-h-40  p-0 rounded-xl">
        <Command className="rounded-xl">
          <CommandInput placeholder={commandInputTitle} className="" />
          <CommandEmpty>Не найдено</CommandEmpty>
          <CommandGroup>
            {data?.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  handleFilter(currentValue, filter);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    searchParams.getAll(filter).includes(item.value)
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
  );
}
