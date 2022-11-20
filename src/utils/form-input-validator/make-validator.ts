import { TInputValidator } from "components/inputs/input-with-validation";

export type TInputSingleValidator = (value: string) => string;

export function makeValidator({
  validatorsList,
}: {
  validatorsList: TInputSingleValidator[];
}): TInputValidator {
  return function validate() {
    let error = "";
    const value = this.getValue();

    for (const validator of validatorsList) {
      error = validator.call(this, value);

      if (error !== "") {
        break;
      }
    }

    this.state.inputError = error;
    this.setPropByPath("htmlAttributes.value", value);

    return !error;
  };
}
