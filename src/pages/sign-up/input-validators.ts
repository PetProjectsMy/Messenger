import * as InputValidators from "utils/form-input-validator";
import { TInputValidator } from "components";
import { EnumInputFields } from "./input-fields";

export const SignupFormValidators: Record<
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
    validatorsList: [InputValidators.validatePasswordRegex],
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

// function validatePasswordRepeatedMatchesPassword(): string {
//   const form = this.refs.Form;
//   const passwordRepeated = this.getValue();
//   const password = form.refs[EnumInputFields.Password].getValue();
//   console.log(`password: ${password}; repeated: ${passwordRepeated}`);

//   const passwordsMatching = passwordRepeated === password;
//   if (!passwordsMatching) {
//     form.state[`${EnumInputFields.PasswordRepeat}_error`] =
//   }
//   return  ? "" : "Passwords don't match";
// }

// SignupFormValidators[EnumInputFields.PasswordRepeat].blur.push(
//   validatePasswordRepeatedMatchesPassword
// );
