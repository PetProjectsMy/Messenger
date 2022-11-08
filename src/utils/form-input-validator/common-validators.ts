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
