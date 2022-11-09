import * as InputValidators from "utils/form-input-validator";
import { TInputValidator } from "components/input";
import { EnumInputFields } from "./enum-input-fields";

function validatePasswordsMatching(): string {
  const form = this.refs.Form;
  const inputFirst = form.refs[EnumInputFields.Password];
  const inputSecond = form.refs[EnumInputFields.PasswordRepeat];

  const password = this.getValue();
  const inputs = {} as any;
  if (this === inputFirst) {
    Object.assign(inputs, {
      passwordOther: inputSecond.getValue(),
      this: EnumInputFields.Password,
      other: EnumInputFields.PasswordRepeat,
    });
  } else {
    Object.assign(inputs, {
      passwordOther: inputFirst.getValue(),
      this: EnumInputFields.PasswordRepeat,
      other: EnumInputFields.Password,
    });
  }

  let error = "";

  const passwordsMatching = password === inputs.passwordOther;
  const inputOther = form.refs[inputs.other];
  const stateOther = inputOther.state;

  if (!passwordsMatching) {
    error = "Passwords don't match";
    form.state[`${inputs.this}_error`] = error;

    if (stateOther.inputError === "") {
      stateOther.inputError = "Passwords don't match";
      form.state[`${inputs.other}_error`] = "Passwords don't match";
      form._render();
    }
  } else if (stateOther.inputError === "Passwords don't match") {
    stateOther.inputError = "";
    form.state[`${inputs.other}_error`] = "";
    form._render();
  }

  return error;
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
  const validator = InputValidators.makeValidator({
    errorStateRef: `${field}_error`,
    validatorsList,
  });
  acc[field] = { blur: [validator] };
  return acc;
}, {} as any);
