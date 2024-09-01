import {
  ElementsType,
  ExtraAttributesType,
  FormElement,
  FormElementInstance,
} from "@/types/FormElementsTypes";
import { MdTextFields } from "react-icons/md";
import DesignerComponent from "./DesignerComponent";
import PropertiesComponent from "./PropertiesComponent";

const type = ElementsType.TEXT_FIELD;
const extraAttributes = {
  label: "Text Field",
  helperText: "Helper Text",
  required: false,
  placeholder: "Value here...",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: PropertiesComponent,
};

export type CustomExtraAttributesType = typeof extraAttributes;
