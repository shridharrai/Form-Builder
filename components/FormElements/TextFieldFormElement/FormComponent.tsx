import React from "react";
import { CustomExtraAttributesType } from ".";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormComponentProps } from "@/types/FormElementsTypes";

const FormComponent: React.FC<FormComponentProps> = ({ elementInstance }) => {
  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes as CustomExtraAttributesType;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>

      <Input placeholder={placeholder} />

      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
};

export default FormComponent;
