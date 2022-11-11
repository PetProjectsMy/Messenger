export function validateNotEmptyValue(value: string): string {
  if (value === "") {
    return "Value is empty";
  }

  return "";
}

export function validateLoginRegex(value: string): string {
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

export function validatePasswordRegex(value: string): string {
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

export function validateTwoFieldsMatching({
  fieldNames,
  notMatchErrorText,
}: {
  fieldNames: { first: string; second: string };
  notMatchErrorText: string;
}): () => string {
  return function validateMatching(): string {
    const form = this.refs.Form;
    const inputFirst = form.refs[fieldNames.first];
    const inputSecond = form.refs[fieldNames.second];

    const value = this.getValue();
    const inputs = {} as any;
    if (this === inputFirst) {
      Object.assign(inputs, {
        valueOther: inputSecond.getValue(),
        this: inputFirst,
        other: inputSecond,
      });
    } else {
      Object.assign(inputs, {
        valueOther: inputFirst.getValue(),
        this: inputSecond,
        other: inputFirst,
      });
    }

    let error = "";

    const valuesMatching = value === inputs.valueOther;
    const stateThis = inputs.this.state;
    const stateOther = inputs.other.state;

    if (!valuesMatching) {
      error = notMatchErrorText;
      stateThis.inputError = error;
      stateOther.inputError = error;
    } else if (stateOther.inputError === notMatchErrorText) {
      stateOther.inputError = "";
      stateThis.inputError = "";
    }

    return error;
  };
}

export function validateNameRegex(value: string): string {
  if (!value.match("^[а-яА-Яa-zA-Z]+$")) {
    return "only latin and cyrillik and -";
  }
  if (!value.match("^[А-ЯA-Z]")) {
    return "must start with capital letter";
  }

  return "";
}

export function validatePhoneRegex(value: string): string {
  if (!value.match(`^[+]?[\\d]+$`)) {
    return "must be digits (starting/not with +)";
  }
  if (!(value.length >= 10 && value.length <= 15)) {
    return "10 ≤ phone length ≤ 15";
  }

  return "";
}

export function validateEmailRegex(value: string): string {
  if (!value.match("^[a-zA-z]+[a-zA-Z\\d-_]*@[a-z]+\\.")) {
    return "incorrect email";
  }

  return "";
}
