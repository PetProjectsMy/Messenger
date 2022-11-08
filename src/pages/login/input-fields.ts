export enum EnumInputFields {
  Login = "login",
  Password = "password",
}

export const MapInputFieldsProps = {
  [EnumInputFields.Login]: { placeholder: "Your Login", htmlName: "login" },
  [EnumInputFields.Password]: {
    placeholder: "Your Password",
    htmlName: "password",
  },
};
