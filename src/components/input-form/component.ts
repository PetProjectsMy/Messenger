import { Block } from "core/dom";
import { Input, Button } from "components";
import { TInputProps } from "components/input/component";
import { deepMerge } from "utils/objects-handle";
import template from "./template";

type TInputFormProps = WithComponentCommonProps<{
  formTitle?: string;
  isSubmitButtonNeeded?: Boolean;
  afterValidationCallback?: () => void;
}>;

type TInputFormState = TAppState & {
  formHasInputErrors: boolean;
  apiResponseSuccess: string;
  apiResponseError: string;
};

export async function submitButtonOnClickCallback() {
  const { form } = this.refs;

  form.clearAPIResponseState();
  form._validateForm();
  // form.props.afterValidationCallback.call(form); // DEBUG
  if (!form.state.formHasInputErrors) {
    console.log(
      `Form filled correctly: ${JSON.stringify(form.collectFormData())}`
    );
    await form.props.afterValidationCallback!.call(form);
  }
}

export class InputForm<
  TEnumInputFiledsNames extends Record<string, string> = {},
  TInputClass extends typeof Input = typeof Input
> extends Block<TInputFormProps, TInputFormState> {
  protected helpers: {
    enumInputFieldsNames: TEnumInputFiledsNames;
  };

  constructor({
    enumInputFieldsNames,
    InputClass = Input as TInputClass,
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
        props: {
          componentName: `${fieldName} input with validation`,
          htmlWrapper: {
            componentAlias: "wrapped",
            htmlWrapperTemplate: `
              <field class="form-field">
                {{{ wrapped }}}
              </field>
              `,
          },
          ...(mapInputToProps![fieldName] ?? {}),
        },
        helpers: mapInputToHelpers[fieldName] ?? {},
      });

      children[`${fieldName}_child`] = inputField;
      refs[fieldName] = inputField;
    });

    const state = Object.values(enumInputFieldsNames).reduce(
      (acc, fieldName) => {
        acc[`${fieldName}_error`] = "";
        return acc;
      },
      {} as any
    );
    Object.assign(state, {
      formHasInputErrors: true,
      apiResponseError: "",
      apiResponseSuccess: "",
    });

    super({
      children,
      props: {
        formTitle: "",
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

    this.props.isSubmitButtonNeeded = this.props.isSubmitButtonNeeded ?? true;
  }

  protected _beforeRenderHook(): void {
    super._beforeRenderHook();

    if (this.props.isSubmitButtonNeeded && !this.children.submitButton) {
      this.children.submitButton = this._createSubmitButton();
    }
  }

  private _createSubmitButton(): Button {
    return new Button({
      refs: { form: this },
      props: {
        type: "button",
        label: "submit",
        htmlClass: "submit-button",
        events: {
          click: [submitButtonOnClickCallback],
        },
      },
    });
  }

  private _validateForm(): void {
    const oldState = deepMerge({}, this.state) as TInputFormState;
    let formHasInputErrors = false;

    Object.values(this.refs).forEach((inputField: Input) => {
      const validators = inputField.getValidators();
      const validatorsByEvent = Object.values(validators);

      for (const eventValidators of validatorsByEvent) {
        for (const validator of eventValidators) {
          const validationResult = validator(false);
          if (!validationResult) {
            formHasInputErrors = true;
            return;
          }
        }
      }
    });

    this.state.formHasInputErrors = formHasInputErrors;
    if (this.state.formHasInputErrors) {
      console.log(`Form has input errors: ${JSON.stringify(this.state)}`);
      this.state.apiResponseError = "Form has input errors";
    }
    this._componentDidUpdate(oldState, this.state);
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

  clearAPIResponseState = () => {
    this.state.apiResponseSuccess = "";
    this.state.apiResponseError = "";
  };

  getAPIResponseError() {
    return this.state.apiResponseError;
  }
}
