import { type Input as TInput } from "components/inputs";
import { type InputForm as TInputForm } from "components/inputs/input-form";
import {
  TInputValidator,
  type InputWithValidation,
} from "components/inputs/input-with-validation";

declare global {
  export namespace ComponentTypings {
    export type Input = TInput;
    export type InputForm<
      TEnumInputFieldsNames extends Record<string, string> = Record<
        string,
        never
      >,
      TInputClass extends typeof InputWithValidation = typeof InputWithValidation
    > = TInputForm<TEnumInputFieldsNames, TInputClass>;

    export type InputValidator = TInputValidator;

    export type FormValidators<FieldsEnum extends string = string> = Record<
      FieldsEnum,
      Record<string, TInputValidator[]>
    >;
  }
}
