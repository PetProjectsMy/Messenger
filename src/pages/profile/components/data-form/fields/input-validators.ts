import * as InputValidators from "utils/form-input-validator";
import { TInputValidator } from "components/inputs/input-with-validation";
import { EnumInputFields } from "./enum-input-fields";

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
}, {} as any);
