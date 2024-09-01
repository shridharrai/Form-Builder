import { DesignerComponentProps } from "@/types/FormElementsTypes";
import React from "react";
import { CustomExtraAttributesType } from ".";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DesignerComponent: React.FC<DesignerComponentProps> = ({
  elementInstance,
}) => {
  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes as CustomExtraAttributesType;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>

      <Input readOnly disabled placeholder={placeholder} />

      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
};

export default DesignerComponent;
