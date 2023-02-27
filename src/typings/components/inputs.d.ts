import { TInputValidator } from "components/inputs/input-with-validation";

declare global {
  export namespace ComponentTypings {
    export type InputValidator = TInputValidator;

    export type FormValidators<FieldsEnum extends string = string> = Record<
      FieldsEnum,
      Record<string, TInputValidator[]>
    >;
  }
}
