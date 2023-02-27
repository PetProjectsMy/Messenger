import * as InputValidators from "utils/form-input-validator";
import { EnumInputFields } from "./enum-input-fields";

export const FormValidators = [
  {
    field: EnumInputFields.FirstName,
    validatorsList: [InputValidators.validateNameRegex],
  },
  {
    field: EnumInputFields.SecondName,
    validatorsList: [InputValidators.validateNameRegex],
  },
  {
    field: EnumInputFields.DisplayName,
    validatorsList: [InputValidators.validateNameRegex],
  },
  {
    field: EnumInputFields.Login,
    validatorsList: [InputValidators.validateLoginRegex],
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
}, {} as TypingsComponent.FormValidators<EnumInputFields>);
