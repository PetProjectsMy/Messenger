import { TInputWithValidationProps } from "components/inputs/input-with-validation";
import { EnumInputFields } from "./enum-input-fields";
import { FormValidators } from "./input-validators";

export const MapInputFieldsProps: Record<
  EnumInputFields,
  TInputWithValidationProps
> = {
  [EnumInputFields.FirstName]: {
    htmlAttributes: { name: "first_name", placeholder: "First Name" },
    validators: FormValidators[EnumInputFields.FirstName],
  },
  [EnumInputFields.SecondName]: {
    htmlAttributes: { name: "second_name", placeholder: "Second Name" },
    validators: FormValidators[EnumInputFields.SecondName],
  },
  [EnumInputFields.Login]: {
    htmlAttributes: { name: "login", placeholder: "Your Login" },
    validators: FormValidators[EnumInputFields.Login],
  },
  [EnumInputFields.Password]: {
    htmlAttributes: { name: "password", placeholder: "Your Password" },
    validators: FormValidators[EnumInputFields.Password],
  },
  [EnumInputFields.PasswordRepeat]: {
    htmlAttributes: { name: "password", placeholder: "Password (Repeat)" },
    validators: FormValidators[EnumInputFields.PasswordRepeat],
  },
  [EnumInputFields.Email]: {
    htmlAttributes: { name: "email", placeholder: "Your Email" },
    validators: FormValidators[EnumInputFields.Email],
  },
  [EnumInputFields.Phone]: {
    htmlAttributes: { name: "phone", placeholder: "Phone Number" },
    validators: FormValidators[EnumInputFields.Phone],
  },
};
