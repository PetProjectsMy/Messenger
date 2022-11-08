import * as InputValidators from "utils/form-input-validator";
import { TInputValidator } from "components";
import { EnumInputFields } from "./enum-input-fields";

function validatePasswordRepeatedMatchesPassword(): string {
  const form = this.refs.Form;
  const passwordRepeated = this.getValue();
  const password = form.refs[EnumInputFields.Password].getValue();

  const passwordsMatching = passwordRepeated === password;
  if (!passwordsMatching) {
    const error = "Passwords don't match";
    form.state[`${EnumInputFields.PasswordRepeat}_error`] = error;
    return error;
  }

  return "";
}

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
    validatorsList: [InputValidators.validatePasswordRegex],
  },
  {
    field: EnumInputFields.PasswordRepeat,
    validatorsList: [
      InputValidators.validatePasswordRegex,
      validatePasswordRepeatedMatchesPassword,
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
  const validator = InputValidators.makeValidator({
    errorStateRef: `${field}_error`,
    validatorsList,
  });
  acc[field] = { blur: [validator] };
  return acc;
}, {} as any);
