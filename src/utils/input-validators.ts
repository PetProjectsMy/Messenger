export const TInputValidators: Record<string, TInputValidator> = [
  { fieldName: "login", validatorsList: [validateLoginRegex] },
  { fieldName: "password", validatorsList: [validatePasswordRegex] },
  { fieldName: "passwordRepeat", validatorsList: [validatePasswordRegex] },
  { fieldName: "firstName", validatorsList: [validateNameRegex] },
  { fieldName: "secondName", validatorsList: [validateNameRegex] },
  { fieldName: "phone", validatorsList: [validatePhoneRegex] },
  { fieldName: "email", validatorsList: [validateEmailRegex] },
].reduce(
  (
    acc,
    {
      fieldName,
      validatorsList,
    }: { fieldName: string; validatorsList: SingleTInputValidator[] }
  ) => {
    acc[fieldName] = makeValidator({
      validatorsList,
      errorStateRef: `${fieldName}Error`,
    });
    return acc;
  },
  {} as Record<string, TInputValidator>
);
