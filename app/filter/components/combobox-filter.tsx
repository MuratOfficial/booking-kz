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

interface ComboboxFilterProps {
  buttonName: string;
  commandInputTitle: string;
  data: {
    value: string;
    label: string;
  }[];
}

export function ComboboxFilter({
  buttonName,
  commandInputTitle,
  data,
}: ComboboxFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

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
            {value.length > 0
              ? data
                  .filter((item) => value.includes(item.value))
                  .map((el, ind) => el.label)
                  .join(", ")
              : buttonName}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 rounded-xl">
        <Command className="rounded-xl">
          <CommandInput placeholder={commandInputTitle} className="" />
          <CommandEmpty>Не найдено</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(
                    value.includes(currentValue)
                      ? value.filter((el) => el !== currentValue)
                      : [...value, currentValue]
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.includes(item.value) ? "opacity-100" : "opacity-0"
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
