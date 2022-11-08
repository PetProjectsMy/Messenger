import { EnumInputFields as EnumSignUpFormFields } from "pages/sign-up/form-component";

export const transformUserData = (data: TUserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};

export function transformSignUpFormDatatoAPI(
  data: Record<EnumSignUpFormFields, string>
): SignUpFormDTO {
  return {
    first_name: data[EnumSignUpFormFields.FirstName],
    second_name: data[EnumSignUpFormFields.SecondName],
    login: data[EnumSignUpFormFields.Login],
    email: data[EnumSignUpFormFields.Email],
    password: data[EnumSignUpFormFields.Password],
    phone: data[EnumSignUpFormFields.Phone],
  };
}
