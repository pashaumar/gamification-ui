import { useState, useCallback } from "react";

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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ModalContent from "../modalContent/ModalContent";

// constant
const initialFormData = {
  reward_event: {
    selectedId: "",
    dynamicValues: {},
    renderedLabel: "",
  },
  reward_with: {
    selectedId: "",
    tierId: "",
    dynamicValues: {},
    renderedLabel: "",
    tierName: "",
  },
  reward_time: {
    enabled: false,
    date: null,
  },
};

const RewardModal = ({ handleOpenModal }) => {
  const [modalData, setModalData] = useState(initialFormData);

  // event and bonus dropdown control state
  const [dropdownOpenMap, setDropdownOpenMap] = useState({
    reward_event: false,
    reward_with: false,
  });

  // modal data update handler
  const handleUpdateModalData = useCallback((fieldKey, newValue) => {
    setModalData((prev) => ({
      ...prev,
      [fieldKey]: newValue,
    }));
  }, []);

  // dropdown state handler
  const handleDropdownState = useCallback((fieldKey, isOpen) => {
    setDropdownOpenMap((prev) => ({
      ...prev,
      [fieldKey]: isOpen,
    }));
  }, []);

  // dropdown data save handler
  const handleDropdownSave = useCallback((fieldKey) => {
    if (fieldKey === "reward_event") {
      setDropdownOpenMap({
        reward_event: false,
        reward_with: true,
      });
      return;
    }

    if (fieldKey === "reward_with") {
      setDropdownOpenMap((prev) => ({
        ...prev,
        reward_with: false,
      }));
    }
  }, []);

  // modal cancel button click handler
  const handleCancel = () => {
    setModalData(initialFormData);
    setDropdownOpenMap({
      reward_event: false,
      reward_with: false,
    });
    handleOpenModal(false);
  };

  // modal create button click handler
  const handleCreate = () => {
    handleOpenModal(false);
  };

  // create button disabled state
  const isCreateButtonDisabled =
    !modalData.reward_event.selectedId ||
    !modalData.reward_with.selectedId ||
    (modalData.reward_time.enabled && !modalData.reward_time.date);

  // Tooltip message generator based on the current state of the form
  const getTooltipMessage = () => {
    const { reward_event, reward_with, reward_time } = modalData;

    if (
      reward_event.selectedId &&
      reward_with.selectedId &&
      reward_time.enabled &&
      !reward_time.date
    ) {
      return "Choose reward end date to continue";
    }

    if (!reward_event.selectedId || !reward_with.selectedId) {
      return "Choose a reward trigger and a reward to continue";
    }

    return "";
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenModal}>
      <DialogContent className="w-[400px] min-h-[372px] max-h-[420px] p-6 flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle className="text-[#303030] text-[20px]">
            Create your reward system
          </DialogTitle>
        </DialogHeader>

        <ModalContent
          handleUpdateModalData={handleUpdateModalData}
          modalData={modalData}
          dropdownOpenMap={dropdownOpenMap}
          handleDropdownState={handleDropdownState}
          handleDropdownSave={handleDropdownSave}
        />

        <DialogFooter className="w-full flex items-center justify-between">
          <Button
            className="w-[168px] h-[40px] bg-white border border-[#E3E3E3] text-[#303030] cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <Button
                  className={`w-[168px] h-[40px] bg-[#C530C5] border border-[#C530C5] ${
                    isCreateButtonDisabled
                      ? "pointer-events-none"
                      : "cursor-pointer"
                  }`}
                  onClick={handleCreate}
                  disabled={isCreateButtonDisabled}
                >
                  Create Reward
                </Button>
              </span>
            </TooltipTrigger>

            {isCreateButtonDisabled && (
              <TooltipContent side="bottom" className="[&_svg]:hidden text-xs">
                <p className="text-[12px]">{getTooltipMessage()}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardModal;
