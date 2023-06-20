import { Block } from "core/dom";
import { TInputProps } from "../basic-input";
import { InputWithValidation } from "../input-with-validation";
import template from "./form-template";
import { FormSubmitButton } from "./submit-button";

type TInputFormProps = ComponentTypings.WithCommonProps<{
  formTitle?: string;
  hasSubmitButton?: boolean;
  afterSubmitCallback?: () => void;
}>;

type TInputFormState = {
  apiResponseSuccess: string;
  apiResponseError: string;
};

export const FORM_VALIDATION_ERROR = "Form has input errors";

export class InputForm<
  TEnumInputFieldsNames extends Record<string, string> = Record<string, never>,
  TInputClass extends typeof InputWithValidation = typeof InputWithValidation
> extends Block<TInputFormProps, TInputFormState> {
  protected helpers: {
    enumInputFieldsNames: TEnumInputFieldsNames;
  };

  constructor({
    enumInputFieldsNames,
    InputClass = InputWithValidation as TInputClass,
    mapInputToProps = {},
    mapInputToHelpers = {},
    props = {},
    helpers = {},
  }: {
    enumInputFieldsNames: TEnumInputFieldsNames;
    mapInputToProps?: Record<string, TInputProps>;
    mapInputToHelpers?: Record<string, ComponentTypings.Helpers>;
    InputClass?: TInputClass;
    props?: TInputFormProps;
    helpers?: ComponentTypings.Helpers;
  }) {
    const children: ComponentTypings.Children = {};
    const refs: ComponentTypings.Refs = {};

    Object.values(enumInputFieldsNames).forEach((fieldName) => {
      const inputField = new InputClass({
        componentName: `${fieldName} input with validation`,
        props: mapInputToProps[fieldName] ?? {},
        helpers: mapInputToHelpers[fieldName] ?? {},
      });

      children[fieldName] = inputField;
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
        hasSubmitButton: true,
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

    if (this.props.hasSubmitButton && !this.children.submitButton) {
      this.children.submitButton = new FormSubmitButton({ form: this });
    }
  }

  public validateForm(): void {
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
      this.state.apiResponseError = FORM_VALIDATION_ERROR;
    } else {
      this.state.apiResponseError = "";
    }
  }

  public async callAfterSubmitCallback() {
    const { afterSubmitCallback } = this.props;
    if (afterSubmitCallback) {
      await afterSubmitCallback.call(this);
    }
  }

  public collectFormData(): Record<string, string> {
    return Object.entries(this.refs).reduce(
      (acc, [fieldName, inputField]: [string, ComponentTypings.Input]) => {
        acc[fieldName] = inputField.getValue();
        return acc;
      },
      {} as Record<string, string>
    );
  }

  public getAPIResponseError() {
    return this.state.apiResponseError;
  }
}
