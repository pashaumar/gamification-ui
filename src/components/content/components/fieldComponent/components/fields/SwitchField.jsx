import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import DatePickerField from "../date/DatePickerField";

const SwitchField = ({ fieldConfig, value, handleUpdateData, fieldKey }) => {
  const { label, subtitle } = fieldConfig;
  const [dateOpen, setDateOpen] = useState(false);

  const isEnabled = !!value?.enabled;

  const handleToggle = (checked) => {
    handleUpdateData(fieldKey, {
      enabled: checked,
      date: value?.date || null,
    });

    if (!checked) {
      setDateOpen(false);
    }
  };

  const handleDateSelect = (date) => {
    handleUpdateData(fieldKey, {
      ...value,
      date,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center h-[30px]">
            <p className="text-[14px] font-medium text-[#303030]">{label}</p>
            <Switch
              checked={isEnabled}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-[#C530C5] cursor-pointer"
            />
          </div>
          {subtitle ? (
            <p className="text-[12px] text-[#616161]">{subtitle}</p>
          ) : null}
        </div>
      </div>

      {isEnabled ? (
        <DatePickerField
          value={value?.date || null}
          open={dateOpen}
          onOpenChange={setDateOpen}
          onSelect={handleDateSelect}
        />
      ) : null}
    </div>
  );
};

export default SwitchField;
