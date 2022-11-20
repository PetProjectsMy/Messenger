import { TInputWithValidationProps } from "components/inputs/input-with-validation";
import { EnumInputFields } from "./enum-input-fields";
import { FormValidators } from "./input-validators";

export const MapInputFieldsProps: Record<
  EnumInputFields,
  TInputWithValidationProps
> = {
  [EnumInputFields.Login]: {
    htmlAttributes: { name: "login", placeholder: "Your Login" },
    validators: FormValidators[EnumInputFields.Login],
  },
  [EnumInputFields.Password]: {
    htmlAttributes: { name: "password", placeholder: "Your Password" },
    validators: FormValidators[EnumInputFields.Password],
  },
};
