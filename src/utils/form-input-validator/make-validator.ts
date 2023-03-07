export type TInputSingleValidator = (value: string) => string;

export function makeValidator({
  validatorsList,
}: {
  validatorsList: TInputSingleValidator[];
}): ComponentTypings.InputValidator {
  return function validate(this: ComponentTypings.Input) {
    let error = "";
    const value = this.getValue();

    for (const validator of validatorsList) {
      error = validator.call(this, value);

      if (error !== "") {
        break;
      }
    }

    this.state.inputError = error;
    this.setPropByPath({ pathString: "htmlAttributes.value", value });

    return !error;
  };
}
