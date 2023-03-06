import { type Input as TInput } from "components/inputs";
import { type InputForm as TInputForm } from "components/inputs/input-form";
import { TInputValidator } from "components/inputs/input-with-validation";

declare global {
  export namespace ComponentTypings {
    export type Input = TInput;
    export type InputForm = TInputForm;

    export type InputValidator = TInputValidator;

    export type FormValidators<FieldsEnum extends string = string> = Record<
      FieldsEnum,
      Record<string, TInputValidator[]>
    >;
  }
}
