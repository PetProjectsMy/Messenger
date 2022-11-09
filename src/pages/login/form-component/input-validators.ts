import {
  makeValidator,
  validateNotEmptyValue,
  validateLoginRegex,
  validatePasswordRegex,
} from "utils/form-input-validator";
import { TInputValidator } from "components/input";
import { EnumInputFields } from "./enum-input-fields";

export const FormValidators: Record<
  EnumInputFields,
  Record<string, TInputValidator[]>
> = [
  {
    field: EnumInputFields.Login,
    validatorsList: [validateLoginRegex],
  },
  {
    field: EnumInputFields.Password,
    validatorsList: [validatePasswordRegex],
  },
].reduce((acc, { field, validatorsList }) => {
  validatorsList.unshift(validateNotEmptyValue);
  const validator = makeValidator({
    errorStateRef: `${field}_error`,
    validatorsList,
  });
  acc[field] = { blur: [validator] };
  return acc;
}, {} as any);
