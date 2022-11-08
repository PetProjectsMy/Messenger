import { TInputValidator } from "components";

export type TInputSingleValidator = (value: string) => string;

export function makeValidator({
  errorStateRef,
  validatorsList,
}: {
  errorStateRef: string;
  validatorsList: TInputSingleValidator[];
}): TInputValidator {
  return function validate(isErrorRenderNeeded = true): boolean {
    let error = "";
    const value = this.getValue();
    const form = this.refs.Form;

    for (const validator of validatorsList) {
      error = validator.call(this, value);
      this.state.inputError = error;

      form.state[errorStateRef] = error;

      if (error !== "") {
        break;
      }
    }

    if (isErrorRenderNeeded) {
      form._render();
    }

    this.state.previousValue = value;

    return !error;
  };
}
