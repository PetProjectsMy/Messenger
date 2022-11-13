import { EnumInputFields } from "./enum-input-fields";
import { FormValidators } from "./input-validators";

export const MapInputFieldsProps = {
  [EnumInputFields.FirstName]: {
    placeholder: "First Name",
    htmlName: "first_name",
    validators: FormValidators[EnumInputFields.FirstName],
  },
  [EnumInputFields.SecondName]: {
    placeholder: "Second Name",
    htmlName: "second_name",
    validators: FormValidators[EnumInputFields.SecondName],
  },
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
  [EnumInputFields.PasswordRepeat]: {
    placeholder: "Password (Repeat)",
    htmlName: "password",
    validators: FormValidators[EnumInputFields.PasswordRepeat],
  },
  [EnumInputFields.Email]: {
    placeholder: "Your Email",
    htmlName: "email",
    validators: FormValidators[EnumInputFields.Email],
  },
  [EnumInputFields.Phone]: {
    placeholder: "Phone Number",
    htmlName: "phone",
    validators: FormValidators[EnumInputFields.Phone],
  },
};
