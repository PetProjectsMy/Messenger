import { EnumInputFields as EnumSignUpFormFields } from "pages/sign-up/form-component";
import { EnumInputFields as EnumLoginFormFields } from "pages/login/form-component";
import { EnumInputFields as EnumProfileFormFields } from "pages/profile/form-component";

export function transformSignUpFormDatatoAPI(
  data: Record<EnumSignUpFormFields, string>
): TSignUpFormDTO {
  return {
    first_name: data[EnumSignUpFormFields.FirstName],
    second_name: data[EnumSignUpFormFields.SecondName],
    login: data[EnumSignUpFormFields.Login],
    email: data[EnumSignUpFormFields.Email],
    password: data[EnumSignUpFormFields.Password],
    phone: data[EnumSignUpFormFields.Phone],
  };
}

export function transformLoginFormDatatoAPI(
  data: Record<EnumLoginFormFields, string>
): TLoginFormDTO {
  return {
    login: data[EnumLoginFormFields.Login],
    password: data[EnumLoginFormFields.Password],
  };
}

export function transformProfileFormDatatoAPI(
  data: Record<EnumProfileFormFields, string>
): TProfileChangeDTO {
  return {
    first_name: data[EnumProfileFormFields.FirstName],
    second_name: data[EnumProfileFormFields.SecondName],
    display_name: data[EnumProfileFormFields.DisplayName],
    login: data[EnumProfileFormFields.Login],
    email: data[EnumProfileFormFields.Email],
    phone: data[EnumProfileFormFields.Phone],
  };
}
