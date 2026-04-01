import React from "react";

// components
import { Input } from "@/components/ui/input";

// utils
import { numbersOnly } from "../../utils";

const DollarInputField = ({ value, onChange }) => {
  return (
    <div className="mt-2 relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#616161]">
        $
      </span>

      <Input
        value={value}
        onChange={(e) => onChange(numbersOnly(e.target.value))}
        placeholder="e.g. 100"
        className="h-[40px] pl-8 
             border border-[#E3E3E3]
             focus:border-2 focus:border-[#C530C5]
             focus-visible:border-2 focus-visible:border-[#C530C5]
             focus-visible:ring-0 
             focus:outline-none
             outline-none"
        autoFocus={true}
      />
    </div>
  );
};

export default DollarInputField;
