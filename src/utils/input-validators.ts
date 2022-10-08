import { InputValidator } from "components";

type SingleInputValidator = (value: string) => string;

function makeValidator({
  errorStateRef,
  validatorsList,
}: {
  errorStateRef: string;
  validatorsList: SingleInputValidator[];
}): InputValidator {
  return function validate(isErrorRenderNeeded = true): boolean {
    let element: Nullable<HTMLInputElement>;
    if (this.htmlWrapped) {
      element = this._element.querySelector("input");
    } else {
      element = this._element;
    }
    if (!(element instanceof HTMLInputElement)) {
      throw new Error(
        `${
          this.componentName
        }: wrong element ${element} of type ${typeof element} to validate input`
      );
    }
    const form = this.refs.Form;

    let error = "";
    const { value } = element;
    for (const validator of validatorsList) {
      error = validator(value);
      form.state[errorStateRef] = error;

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

function validateLoginRegex(value: string): string {
  if (value.length < 3) {
    return "length must be ≥ 3";
  }
  if (!value.match("^[a-zA-Z0-9_-]+$")) {
    return "only latin, digits and _ -";
  }
  if (!value.match("[a-zA-Z]+")) {
    return "must include letter(s)";
  }
  if (value.length > 20) {
    return "length must be ≤ 3";
  }

  return "";
}

function validatePasswordRegex(value: string): string {
  if (value.length < 8) {
    return "length must be ≥ 8";
  }
  if (!value.match("[A-Z]+")) {
    return "One capital letter at minimun";
  }
  if (!value.match("[0-9]+")) {
    return "One digit at minimun";
  }
  if (value.length > 40) {
    return "length must be ≤ 40";
  }

  return "";
}

function validateNameRegex(value: string): string {
  if (!value.match("^[а-яА-Яa-zA-Z]+$")) {
    return "only latin and cyrillik and -";
  }
  if (!value.match("^[А-ЯA-Z]")) {
    return "must start with capital letter";
  }
  return "";
}

function validatePhoneRegex(value: string): string {
  if (!value.match(`^[+]?[\\d]+$`)) {
    return "must be digits (starting/not with +)";
  }
  if (!(value.length >= 10 && value.length <= 15)) {
    return "10 ≤ phone length ≤ 15";
  }
  return "";
}

function validateEmailRegex(value: string): string {
  if (!value.match("^[a-zA-z]+[a-zA-Z\\d-_]*@[a-z]+\\.")) {
    return "incorrect email";
  }

  return "";
}

export const InputValidators: Record<string, InputValidator> = [
  ["login", [validateLoginRegex]],
  ["password", [validatePasswordRegex]],
  ["passwordRepeat", [validatePasswordRegex]],
  ["firstName", [validateNameRegex]],
  ["secondName", [validateNameRegex]],
  ["phone", [validatePhoneRegex]],
  ["email", [validateEmailRegex]],
].reduce(
  (acc, [fieldName, validatorsList]: [string, SingleInputValidator[]]) => {
    acc[fieldName] = makeValidator({
      validatorsList,
      errorStateRef: `${fieldName}Error`,
    });
    return acc;
  },
  {} as Record<string, InputValidator>
);
