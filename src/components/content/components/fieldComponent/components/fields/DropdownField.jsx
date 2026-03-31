import React, { useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { getSelectedOption, replaceDynamicChars } from "../../utils";
import DollarInputField from "../dropdown/DollarInputField";
import PeriodInputField from "../dropdown/PeriodInputField";

const DropdownField = ({
  fieldConfig,
  value,
  handleUpdateData,
  fieldKey,
  onSave,
  open,
  handleDropdownState,
}) => {
  const { label, placeholder, options = [] } = fieldConfig;

  const selectedOption = useMemo(() => {
    return getSelectedOption(options, value?.selectedId);
  }, [options, value?.selectedId]);

  const selectedLabel = useMemo(() => {
    if (!selectedOption) return placeholder || "";
    return replaceDynamicChars(
      selectedOption.label,
      value?.dynamicValues || {},
    );
  }, [selectedOption, value?.dynamicValues, placeholder]);

  const updateFieldValue = (nextValue) => {
    handleUpdateData(fieldKey, nextValue);
  };

  const clearSelection = () => {
    updateFieldValue({
      selectedId: "",
      dynamicValues: {},
      renderedLabel: "",
    });
  };

  const selectOption = (item) => {
    updateFieldValue({
      selectedId: item.id,
      dynamicValues: {},
      renderedLabel: item.label,
    });

    // Close dropdown if option has no extended UI type
    if (!item.extendedUIType) {
      handleDropdownState(false);
      if (onSave) {
        onSave(fieldKey);
      }
    }
  };

  const updateDynamicValue = (key, nextValue) => {
    const nextDynamicValues = {
      ...value?.dynamicValues,
      [key]: nextValue,
    };

    updateFieldValue({
      ...value,
      dynamicValues: nextDynamicValues,
      renderedLabel: selectedOption
        ? replaceDynamicChars(selectedOption.label, nextDynamicValues)
        : "",
    });
  };

  const getSaveDisabledState = () => {
    const { X: xValue, Y: yValue } = value?.dynamicValues || {};

    switch (selectedOption?.extendedUIType) {
      case "Dollar_Input":
        return xValue && xValue !== "";

      case "Period_Input":
        return xValue && xValue !== "" && yValue && yValue !== "";

      default:
        return false;
    }
  };

  const renderExtendedUI = () => {
    switch (selectedOption?.extendedUIType) {
      case "Dollar_Input":
        return (
          <DollarInputField
            value={value?.dynamicValues?.X || ""}
            onChange={(nextValue) => updateDynamicValue("X", nextValue)}
          />
        );

      case "Period_Input":
        return (
          <PeriodInputField
            xValue={value?.dynamicValues?.X || ""}
            yValue={value?.dynamicValues?.Y || ""}
            periodOptions={selectedOption?.period_options || []}
            onXChange={(nextValue) => updateDynamicValue("X", nextValue)}
            onYChange={(nextValue) => updateDynamicValue("Y", nextValue)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-medium text-[#616161]">
        {label} <span className="text-[#E51C00]">*</span>
      </label>

      <Popover open={open} onOpenChange={handleDropdownState}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-[40px] w-full items-center justify-between rounded-[8px] border-2 border-[#C530C5] bg-white px-4 text-left text-[16px] text-[#303030] cursor-pointer"
          >
            <span>{selectedLabel || placeholder}</span>
            {open ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] rounded-[16px] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)] gap-0"
        >
          {options.map((item) => {
            const isSelected = value?.selectedId === item.id;
            const optionLabel = isSelected
              ? replaceDynamicChars(item.label, value?.dynamicValues || {})
              : item.label;

            return (
              <div key={item.id}>
                <div
                  onClick={() => {
                    if (isSelected) {
                      clearSelection();
                    } else {
                      selectOption(item);
                    }
                  }}
                  className={`cursor-pointer rounded-[8px] h-[40px] text-[16px] items-center flex p-2 ${
                    isSelected
                      ? "bg-[#FFF5FF] text-[#C530C5]"
                      : "text-[#303030]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{optionLabel}</span>
                    {isSelected ? <Check className="h-5 w-5" /> : null}
                  </div>
                </div>

                {isSelected ? renderExtendedUI() : null}
              </div>
            );
          })}

          {selectedOption?.extendedUIType && (
            <div className="mt-2 flex gap-3">
              <Button
                variant="outline"
                className="h-[40px] flex-1 rounded-[10px] border-[#E3E3E3] text-[16px] text-[#303030] cursor-pointer"
                onClick={() => {
                  handleDropdownState(false);
                }}
              >
                Cancel
              </Button>

              <Button
                disabled={!getSaveDisabledState()}
                className={
                  "h-[40px] flex-1 rounded-[10px] border-[#C530C5] text-[16px] " +
                  "text-[white] bg-[#C530C5] cursor-pointer " +
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                }
                onClick={() => {
                  handleDropdownState(false);
                  onSave(fieldKey);
                }}
              >
                Save
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DropdownField;
