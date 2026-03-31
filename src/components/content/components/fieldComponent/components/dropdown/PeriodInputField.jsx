import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { numbersOnly } from "../../utils";
import PeriodSelect from "./PeriodSelect";

const PeriodInputField = ({
  xValue,
  yValue,
  periodOptions,
  onXChange,
  onYChange,
}) => {
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);

  const handleSelectPeriod = (value) => {
    onYChange(value);
    setPeriodDropdownOpen(false);
  };

  return (
    <div className="mt-2 flex gap-2">
      <Input
        value={xValue}
        onChange={(e) => onXChange(numbersOnly(e.target.value))}
        placeholder="eg: 4"
        className="
          h-[40px] w-[45%] px-3
          border-2 border-[#C530C5]
          focus:border-[#C530C5]
          focus-visible:border-[#C530C5]
          focus-visible:ring-0
          focus:outline-none
        "
        autoFocus={true}
      />

      <div className="w-[55%]">
        <PeriodSelect
          value={yValue}
          options={periodOptions}
          open={periodDropdownOpen}
          onOpenChange={setPeriodDropdownOpen}
          onSelect={handleSelectPeriod}
        />
      </div>
    </div>
  );
};

export default PeriodInputField;
