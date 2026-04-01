import React, { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, ChevronDown, ChevronUp, Edit2 } from "lucide-react";

import { getSelectedOption, replaceDynamicChars } from "../../utils";
import DollarInputField from "../dollarInputField/DollarInputField";
import PeriodInputField from "../periodInputField/PeriodInputField";
import TierSelectionModal from "../tierSelectionModal/TierSelectionModal";

const DropdownField = ({
  fieldConfig,
  value,
  handleUpdateModalData,
  fieldKey,
  handleDropdownSave,
  open,
  handleDropdownState,
  modalData,
}) => {
  const { label, placeholder, options = [] } = fieldConfig;
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return getSelectedOption(options, value?.selectedId);
  }, [options, value?.selectedId]);

  const selectedLabel = useMemo(() => {
    if (!selectedOption) return "";

    // For tier selection, dynamically update the label with the selected tier name
    const isTierOption = selectedOption.id === "tier";
    const hasTierName = value?.tierName;
    const isTierLabel = selectedOption.label.includes(
      "Upgrade Commission Tier",
    );

    if (isTierOption && hasTierName && isTierLabel) {
      return `Upgrade to {${value.tierName}}`;
    }

    return replaceDynamicChars(
      selectedOption.label,
      value?.dynamicValues || {},
    );
  }, [selectedOption, value]);

  const updateFieldValue = (nextValue) => {
    handleUpdateModalData(fieldKey, nextValue);
  };

  const clearSelection = () => {
    updateFieldValue({
      selectedId: "",
      tierId: "",
      tierName: "",
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

    if (item.extendedUIType === "Tier_Selection") {
      setIsTierModalOpen(true);
      handleDropdownState(false);
      return;
    }

    if (!item.extendedUIType) {
      handleDropdownState(false);
      handleDropdownSave(fieldKey);
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

  const getSaveButtonTooltip = () => {
    const { X: xValue } = value?.dynamicValues || {};

    switch (selectedOption?.extendedUIType) {
      case "Dollar_Input":
        if (!xValue || xValue === "") {
          const isSalesEvent = selectedOption?.label.includes("Cross");
          return isSalesEvent
            ? "Enter the sales target amount to continue"
            : "Enter the bonus amount to continue";
        }
        break;

      default:
        return "";
    }

    return "";
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

  const handleEditTier = (e) => {
    e.stopPropagation();
    setIsTierModalOpen(true);
  };

  const renderTierEditButton = (isSelected, itemId) => {
    const isTierOption = itemId === "tier";
    const shouldShowEdit = isSelected && isTierOption;

    if (!shouldShowEdit) return null;

    return (
      <button
        type="button"
        onClick={handleEditTier}
        className="hover:text-[#C530C5] transition-colors p-1"
        aria-label="Edit tier selection"
      >
        <Edit2 className="h-4 w-4 cursor-pointer" />
      </button>
    );
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
            className={`flex h-[40px] w-full items-center justify-between rounded-[8px] border bg-white px-4 text-left text-[16px] cursor-pointer transition-colors ${open ? "border-[#C530C5] border-2" : "border-[#E3E3E3]"}`}
          >
            <span
              className={`${selectedLabel ? "text-[#303030]" : "text-[#B5B5B5]"}`}
            >
              {selectedLabel || placeholder}
            </span>
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

            let optionLabel = item.label;
            if (isSelected) {
              if (item.id === "tier" && value?.tierName) {
                optionLabel = `Upgrade to {${value.tierName}}`;
              } else {
                optionLabel = replaceDynamicChars(
                  item.label,
                  value?.dynamicValues || {},
                );
              }
            }

            const isTierOption = item.id === "tier";
            const isRewardEventSales =
              modalData?.reward_event?.selectedId === "sales";
            const isDisabled = isTierOption && !isRewardEventSales;

            return (
              <div key={item.id}>
                <div
                  onClick={() => {
                    if (!isDisabled) {
                      if (isSelected) {
                        clearSelection();
                      } else {
                        selectOption(item);
                      }
                    }
                  }}
                  className={`cursor-pointer rounded-[8px] h-[40px] text-[16px] items-center flex p-2 ${
                    isSelected
                      ? "bg-[#FFF5FF] text-[#C530C5]"
                      : isDisabled
                        ? "bg-[#F5F5F5] text-[#999999] cursor-not-allowed"
                        : "text-[#303030]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{optionLabel}</span>
                    <div className="flex items-center gap-2">
                      {renderTierEditButton(isSelected, item.id)}
                      {isSelected ? <Check className="h-5 w-5" /> : null}
                    </div>
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

              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block flex-1">
                    <Button
                      disabled={!getSaveDisabledState()}
                      className={`h-[40px] w-full rounded-[10px] border-[#C530C5] text-[16px] text-[white] bg-[#C530C5] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                      onClick={() => {
                        handleDropdownState(false);
                        handleDropdownSave(fieldKey);
                      }}
                    >
                      Save
                    </Button>
                  </span>
                </TooltipTrigger>

                {!getSaveDisabledState() && getSaveButtonTooltip() && (
                  <TooltipContent
                    side="bottom"
                    className="[&_svg]:hidden text-xs"
                  >
                    <p className="text-[12px]">{getSaveButtonTooltip()}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {fieldKey === "reward_with" && (
        <TierSelectionModal
          isOpen={isTierModalOpen}
          onClose={() => setIsTierModalOpen(false)}
          options={
            fieldConfig.options?.find((opt) => opt.id === "tier")
              ?.tierOptions || []
          }
          selectedValue={value?.selectedId === "tier" ? value?.tierId : ""}
          onTierSelect={(tierId, tierName) => {
            updateFieldValue({
              selectedId: "tier",
              tierId: tierId,
              dynamicValues: {},
              renderedLabel: `Upgrade to {${tierName}}`,
              tierName: tierName,
            });
            if (handleDropdownSave) {
              handleDropdownSave(fieldKey);
            }
            setIsTierModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default DropdownField;
