import { EnumInputFields as EnumSignUpFormFields } from "pages/sign-up/form-component";
import { EnumInputFields as EnumLoginFormFields } from "pages/login/form-component";
import { EnumInputFields as EnumProfileFormFields } from "pages/profile/components/data-form";

declare global {
  export type TSignupFormData = Record<EnumSignUpFormFields, string>;

  export type TLoginFormData = Record<EnumLoginFormFields, string>;

  export type TProfileFormData = Record<EnumProfileFormFields, string>;

  export type TAddChatUsersFormData = {
    chatID: string;
    usersList: string[];
  };
}

export {};
