import {
  ElementsType,
  ExtraAttributesType,
  FormElement,
} from "@/types/FormElementstypes";
import { MdTextFields } from "react-icons/md";

const type = ElementsType.TEXT_FIELD;
const extraAttributes: ExtraAttributesType = {
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
  designerComponent: () => <div>Designer Component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};
