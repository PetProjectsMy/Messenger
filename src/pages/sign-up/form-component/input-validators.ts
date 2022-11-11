import * as InputValidators from "utils/form-input-validator";
import { TInputValidator } from "components/input-with-validation";
import { EnumInputFields } from "./enum-input-fields";

const validatePasswordsMatching = InputValidators.validateTwoFieldsMatching({
  fieldNames: {
    first: EnumInputFields.Password,
    second: EnumInputFields.PasswordRepeat,
  },
  notMatchErrorText: "Passwords don't match",
});

export const FormValidators: Record<
  EnumInputFields,
  Record<string, TInputValidator[]>
> = [
  {
    field: EnumInputFields.FirstName,
    validatorsList: [InputValidators.validateNameRegex],
  },
  {
    field: EnumInputFields.SecondName,
    validatorsList: [InputValidators.validateNameRegex],
  },
  {
    field: EnumInputFields.Login,
    validatorsList: [InputValidators.validateLoginRegex],
  },
  {
    field: EnumInputFields.Password,
    validatorsList: [
      InputValidators.validatePasswordRegex,
      validatePasswordsMatching,
    ],
  },
  {
    field: EnumInputFields.PasswordRepeat,
    validatorsList: [
      InputValidators.validatePasswordRegex,
      validatePasswordsMatching,
    ],
  },
  {
    field: EnumInputFields.Email,
    validatorsList: [InputValidators.validateEmailRegex],
  },
  {
    field: EnumInputFields.Phone,
    validatorsList: [InputValidators.validatePhoneRegex],
  },
].reduce((acc, { field, validatorsList }) => {
  validatorsList.unshift(InputValidators.validateNotEmptyValue);
  const validator = InputValidators.makeValidator({
    validatorsList,
  });
  acc[field] = { blur: [validator] };
  return acc;
}, {} as any);
