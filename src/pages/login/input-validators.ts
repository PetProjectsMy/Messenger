import {
  makeValidator,
  validateLoginRegex,
  validatePasswordRegex,
} from "utils/form-input-validator";
import { TInputValidator } from "components";
import { EnumInputFields } from "./input-fields";

export const LoginFormValidators: Record<
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
  const validator = makeValidator({
    errorStateRef: `${field}_error`,
    validatorsList,
  });
  acc[field] = { blur: [validator] };
  return acc;
}, {} as any);
