import React, { useState, useEffect } from "react";

// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// icons
import { ChevronDown, ChevronUp, Check } from "lucide-react";

const TierSelectionModal = ({
  isOpen,
  onClose,
  options = [],
  selectedValue,
  onTierSelect,
}) => {
  const [selectedTier, setSelectedTier] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedTier(selectedValue || "");
    }
  }, [isOpen]);

  const handleSave = () => {
    if (selectedTier) {
      const selectedTierData = options.find((opt) => opt.id === selectedTier);
      if (selectedTierData) {
        onTierSelect(selectedTier, selectedTierData.label);
        onClose();
      }
    }
  };

  const handleClose = () => {
    setSelectedTier("");
    setIsDropdownOpen(false);
    onClose();
  };

  const getSelectedTierLabel = () => {
    const selected = options.find((opt) => opt.id === selectedTier);
    return selected ? selected.label : "Select a tier";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[400px] h-[224px] p-6 flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle className="text-[#303030] text-[20px]">
            Select a commission tier
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 flex-1 justify-center">
          <label className="text-[14px] font-medium text-[#616161]">
            Upgrade to <span className="text-[#E51C00]">*</span>
          </label>
          <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={`flex h-[40px] w-full items-center justify-between rounded-[8px] border bg-white px-4 text-left text-[16px] cursor-pointer transition-colors ${
                  selectedTier ? "text-[#303030]" : "text-[#B5B5B5]"
                } ${
                  isDropdownOpen
                    ? "border-[#C530C5] border-2"
                    : "border-[#E3E3E3]"
                }`}
              >
                <span>{getSelectedTierLabel()}</span>
                {isDropdownOpen ? (
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
              {options.map((option) => {
                const isSelected = selectedTier === option.id;
                return (
                  <div key={option.id}>
                    <div
                      onClick={() => {
                        setSelectedTier(option.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`cursor-pointer rounded-[8px] h-[40px] text-[16px] items-center flex p-2 transition-colors ${
                        isSelected
                          ? "bg-[#FFF5FF] text-[#C530C5]"
                          : "text-[#303030] hover:bg-[#F9F9F9]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        {isSelected ? <Check className="h-5 w-5" /> : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </PopoverContent>
          </Popover>
        </div>

        <DialogFooter className="w-full flex items-center justify-between">
          <Button
            className="w-[168px] h-[40px] bg-white border border-[#E3E3E3] text-[#303030] cursor-pointer"
            onClick={handleClose}
          >
            Go Back
          </Button>

          <Button
            className="w-[168px] h-[40px] bg-[#C530C5] border border-[#C530C5] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={!selectedTier}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TierSelectionModal;
