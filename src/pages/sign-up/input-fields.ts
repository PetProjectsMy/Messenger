export enum EnumInputFields {
  FirstName = "first_name",
  SecondName = "second_name",
  Login = "login",
  Password = "password",
  PasswordRepeat = "password_repeat",
  Email = "email",
  Phone = "phone",
}

export const MapInputFieldsProps = {
  [EnumInputFields.FirstName]: {
    placeholder: "First Name",
    htmlName: "first_name",
  },
  [EnumInputFields.SecondName]: {
    placeholder: "Second Name",
    htmlName: "second_name",
  },
  [EnumInputFields.Login]: { placeholder: "Your Login", htmlName: "login" },
  [EnumInputFields.Password]: {
    placeholder: "Your Password",
    htmlName: "password",
  },
  [EnumInputFields.PasswordRepeat]: {
    placeholder: "Password (Repeat)",
    htmlName: "password",
  },
  [EnumInputFields.Email]: {
    placeholder: "Your Email",
    htmlName: "email",
  },
  [EnumInputFields.Phone]: {
    placeholder: "Phone Number",
    htmlName: "phone",
  },
};
