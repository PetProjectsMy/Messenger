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
      error = validator(value);

      const oldState = JSON.stringify(form.state);
      form.state[errorStateRef] = error;
      const newState = JSON.stringify(form.state);
      console.log(`Form State: ${oldState} -> ${newState}`);

      if (error !== "") {
        break;
      }
    }

    if (isErrorRenderNeeded) {
      form._render();
    }

    this.state.previousValue = value;

    return !!error;
  };
}
