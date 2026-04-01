import React from "react";

// components
import DropdownField from "./components/dropdownField/DropdownField";
import SwitchField from "./components/switchField/SwitchField";

const FieldComponent = ({
  fieldConfig,
  value,
  handleUpdateModalData,
  fieldKey,
  open,
  handleDropdownState,
  handleDropdownSave,
  modalData,
}) => {
  switch (fieldConfig.uiType) {
    case "Dropdown":
      return (
        <DropdownField
          fieldConfig={fieldConfig}
          value={value}
          handleUpdateModalData={handleUpdateModalData}
          fieldKey={fieldKey}
          open={!!open}
          handleDropdownState={handleDropdownState}
          handleDropdownSave={handleDropdownSave}
          modalData={modalData}
        />
      );

    case "Switch":
      return (
        <SwitchField
          fieldConfig={fieldConfig}
          value={value}
          handleUpdateModalData={handleUpdateModalData}
          fieldKey={fieldKey}
        />
      );

    default:
      return null;
  }
};

export default FieldComponent;
