import { Block } from "core/dom/block";
import { InputWithValidation } from "../input-with-validation";
import { type Input, TInputProps } from "../basic-input";
import { FormSubmitButton } from "./submit-button";
import template from "./form-template";

type TInputFormProps = WithComponentCommonProps<{
  formTitle?: string;
  isSubmitButtonNeeded?: Boolean;
  afterValidationCallback?: () => void;
}>;

type TInputFormState = {
  apiResponseSuccess: string;
  apiResponseError: string;
};

export class InputForm<
  TEnumInputFiledsNames extends Record<string, string> = {},
  TInputClass extends typeof InputWithValidation = typeof InputWithValidation
> extends Block<TInputFormProps, TInputFormState> {
  protected helpers: {
    enumInputFieldsNames: TEnumInputFiledsNames;
  };

  static readonly validationFailedError = "Form has input errors";

  constructor({
    enumInputFieldsNames,
    InputClass = InputWithValidation as TInputClass,
    mapInputToProps = {},
    mapInputToHelpers = {},
    props = {},
    helpers = {},
  }: {
    enumInputFieldsNames: TEnumInputFiledsNames;
    mapInputToProps?: Record<string, TInputProps>;
    mapInputToHelpers?: Record<string, TComponentHelpers>;
    InputClass?: TInputClass;
    props?: TInputFormProps;
    helpers?: TComponentHelpers;
  }) {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    Object.values(enumInputFieldsNames).forEach((fieldName) => {
      const inputField = new InputClass({
        componentName: `${fieldName} input with validation`,
        props: mapInputToProps![fieldName] ?? {},
        helpers: mapInputToHelpers[fieldName] ?? {},
      });

      children[`${fieldName}_child`] = inputField;
      refs[fieldName] = inputField;
    });

    const state = {
      apiResponseError: "",
      apiResponseSuccess: "",
    };

    super({
      children,
      props: {
        formTitle: "",
        isSubmitButtonNeeded: true,
        afterValidationCallback: () => {},
        ...props,
      },
      refs,
      state,
      helpers: {
        enumInputFieldsNames,
        ...helpers,
      },
    });
  }

  render() {
    return template(this.helpers.enumInputFieldsNames);
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    Object.values(this.refs).forEach((inputField: Block) => {
      inputField.refs.Form = this;
    });
  }

  protected _beforeRenderHook(): void {
    super._beforeRenderHook();

    if (this.props.isSubmitButtonNeeded && !this.children.submitButton) {
      this.children.submitButton = new FormSubmitButton({ form: this });
    }
  }

  // @ts-ignore '_validateForm' is declared but its value is never read
  private _validateForm(): void {
    let formHasInputErrors = false;

    Object.values(this.refs).forEach((inputField: InputWithValidation) => {
      const validators = inputField.getValidators();
      const validatorsByEvent = Object.values(validators);

      for (const eventValidators of validatorsByEvent) {
        for (const validator of eventValidators) {
          const validationResult = validator();
          if (!validationResult) {
            formHasInputErrors = true;
            return;
          }
        }
      }
    });

    if (formHasInputErrors) {
      console.log(`Form has input errors: ${JSON.stringify(this.state)}`);
      this.state.apiResponseError = InputForm.validationFailedError;
    } else {
      this.state.apiResponseError = "";
    }
  }

  public collectFormData(): Record<string, string> {
    return Object.entries(this.refs).reduce(
      (acc, [fieldName, inputField]: [string, Input]) => {
        acc[fieldName] = inputField.getValue();
        return acc;
      },
      {} as Record<string, string>
    );
  }

  getAPIResponseError() {
    return this.state.apiResponseError;
  }
}
