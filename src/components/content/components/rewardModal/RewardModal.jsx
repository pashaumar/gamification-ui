import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import ModalContent from "../modalContent/ModalContent";

const initialFormData = {
  reward_event: {
    selectedId: "",
    dynamicValues: {},
    renderedLabel: "",
  },
  reward_with: {
    selectedId: "",
    dynamicValues: {},
    renderedLabel: "",
  },
  reward_time: {
    enabled: false,
    date: null,
  },
};

const RewardModal = ({ handleOpenModal }) => {
  const [modalData, setModalData] = useState(initialFormData);

  const [dropdownOpenMap, setDropdownOpenMap] = useState({
    reward_event: false,
    reward_with: false,
  });

  const handleUpdateModalData = (fieldKey, newValue) => {
    setModalData((prev) => ({
      ...prev,
      [fieldKey]: newValue,
    }));
  };

  const handleDropdownState = (fieldKey, isOpen) => {
    setDropdownOpenMap((prev) => ({
      ...prev,
      [fieldKey]: isOpen,
    }));
  };

  const handleDropdownSave = (fieldKey) => {
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
  };

  const handleCancel = () => {
    setModalData(initialFormData);
    setDropdownOpenMap({
      reward_event: false,
      reward_with: false,
    });
    handleOpenModal(false);
  };

  const handleCreate = () => {
    handleOpenModal(false);
  };

  const isCreateButtonDisabled =
    !modalData.reward_event.selectedId ||
    !modalData.reward_with.selectedId ||
    (modalData.reward_time.enabled && !modalData.reward_time.date);

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

          <Button
            className="w-[168px] h-[40px] bg-[#C530C5] border border-[#C530C5] cursor-pointer"
            onClick={handleCreate}
            disabled={isCreateButtonDisabled}
          >
            Create Reward
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardModal;
