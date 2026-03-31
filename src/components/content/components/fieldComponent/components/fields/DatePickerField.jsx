import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, getTomorrow } from "../../utils";

const DatePickerField = ({ value, open, onOpenChange, onSelect }) => {
  const tomorrow = getTomorrow();

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-[40px] w-full items-center gap-2 rounded-[10px] border border-[#C530C5] bg-white px-3 text-left text-[14px] text-[#303030]"
        >
          <CalendarDays className="h-4 w-4 text-[#616161]" />
          <span>{value ? formatDate(value) : "Select date"}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto rounded-[12px] border border-[#E8E8E8] bg-white p-3"
      >
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={(date) => {
            onSelect(date);
            if (date) onOpenChange(false);
          }}
          disabled={(date) => date < tomorrow}
          className="rounded-[12px]"
          components={{
            Chevron: ({ orientation }) =>
              orientation === "left" ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              ),
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerField;
