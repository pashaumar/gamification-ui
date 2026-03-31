import React from "react";
import FieldComponent from "../fieldComponent/FieldComponent";
import template from "../templates/reward.json";

const ModalContent = ({
  handleUpdateData,
  modalData,
  dropdownOpenMap,
  handleDropdownOpenChange,
  handleDropdownSave,
}) => {
  const { fields, field_list } = template.body;

  return (
    <div className="flex flex-col gap-4">
      {fields.map((fieldKey) => (
        <FieldComponent
          key={fieldKey}
          fieldKey={fieldKey}
          fieldConfig={field_list[fieldKey]}
          value={modalData[fieldKey]}
          handleUpdateData={handleUpdateData}
          open={dropdownOpenMap[fieldKey]}
          onOpenChange={(isOpen) => handleDropdownOpenChange(fieldKey, isOpen)}
          onSave={() => handleDropdownSave(fieldKey)}
        />
      ))}
    </div>
  );
};

export default ModalContent;
