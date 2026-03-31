import React from "react";
import DropdownField from "./components/fields/DropdownField";
import SwitchField from "./components/fields/SwitchField";

const FieldComponent = ({
  fieldConfig,
  value,
  handleUpdateModalData,
  fieldKey,
  open,
  handleDropdownState,
  handleDropdownSave,
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
