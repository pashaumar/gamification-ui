import React from "react";
import DropdownField from "./components/fields/DropdownField";
import SwitchField from "./components/fields/SwitchField";

const FieldComponent = ({
  fieldConfig,
  value,
  handleUpdateData,
  fieldKey,
  open,
  onOpenChange,
  onSave,
}) => {
  switch (fieldConfig.uiType) {
    case "Dropdown":
      return (
        <DropdownField
          fieldConfig={fieldConfig}
          value={value}
          handleUpdateData={handleUpdateData}
          fieldKey={fieldKey}
          open={!!open}
          onOpenChange={onOpenChange}
          onSave={onSave}
        />
      );

    case "Switch":
      return (
        <SwitchField
          fieldConfig={fieldConfig}
          value={value}
          handleUpdateData={handleUpdateData}
          fieldKey={fieldKey}
        />
      );

    default:
      return null;
  }
};

export default FieldComponent;
