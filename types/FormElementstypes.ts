import React from "react";

export const enum ElementsType {
  TEXT_FIELD = "TextField",
}

export type ExtraAttributesType = Record<string, string | boolean>;

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: ExtraAttributesType;
};

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<DesignerComponentProps>;
  formComponent: React.FC;
  propertiesComponent: React.FC<DesignerComponentProps>;
};

export type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export type DesignerComponentProps = {
  elementInstance: FormElementInstance;
};
