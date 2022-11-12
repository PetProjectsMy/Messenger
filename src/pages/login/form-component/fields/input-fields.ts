import { EnumInputFields } from "./enum-input-fields";
import { FormValidators } from "./input-validators";

export const MapInputFieldsProps = {
  [EnumInputFields.Login]: {
    placeholder: "Your Login",
    htmlName: "login",
    validators: FormValidators[EnumInputFields.Login],
  },
  [EnumInputFields.Password]: {
    placeholder: "Your Password",
    htmlName: "password",
    validators: FormValidators[EnumInputFields.Password],
  },
};
