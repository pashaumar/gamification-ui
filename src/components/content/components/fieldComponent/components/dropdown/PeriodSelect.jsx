import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ChevronUp } from "lucide-react";

const PeriodSelect = ({ value, options, open, onOpenChange, onSelect }) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`flex h-[40px] w-full items-center justify-between rounded-[10px] bg-white px-3 text-left text-[14px] ${
            open ? "border-2 border-[#C530C5]" : "border border-[#D9D9D9]"
          } ${value ? "text-[#303030]" : "text-[#B5B5B5]"} cursor-pointer`}
        >
          <span>{value || "Select duration"}</span>
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] rounded-[10px] p-2"
      >
        <div className="flex flex-col">
          {options.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                onSelect(item.value);
                onOpenChange(false);
              }}
              className="cursor-pointer rounded-[8px] px-3 py-2 text-[14px] text-[#303030] hover:bg-[#FAECFA]"
            >
              {item.label}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PeriodSelect;
