export type TInputSingleValidator = (value: string) => string;

export function makeValidator({
  validatorsList,
}: {
  validatorsList: TInputSingleValidator[];
}): TypingsComponent.InputValidator {
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
