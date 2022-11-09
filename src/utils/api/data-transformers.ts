import { EnumInputFields as EnumSignUpFormFields } from "pages/sign-up/form-component";
import { EnumInputFields as EnumLoginFormFields } from "pages/login/form-component";

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
