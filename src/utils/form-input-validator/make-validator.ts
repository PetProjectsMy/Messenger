import { TInputValidator } from "components/input";

export type TInputSingleValidator = (value: string) => string;

export function makeValidator({
  errorStateRef,
  validatorsList,
}: {
  errorStateRef: string;
  validatorsList: TInputSingleValidator[];
}): TInputValidator {
  return function validate(isFormRerenderNeeded = true): boolean {
    let error = "";
    const value = this.getValue();
    const form = this.refs.Form;

    for (const validator of validatorsList) {
      error = validator.call(this, value);
      form.state[errorStateRef] = error;

      if (error !== "") {
        break;
      }
    }

    const previousError = this.state.inputError;
    if (isFormRerenderNeeded && previousError !== error) {
      form._render();
    }

    return !error;
  };
}
