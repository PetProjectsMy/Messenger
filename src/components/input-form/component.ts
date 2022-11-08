import { Block } from "core/dom";
import { Input, Button } from "components";
import { TInputProps } from "components/input/component";
import { deepMerge } from "utils/objects-handle";
import template from "./template";

type TInputFormProps = WithComponentCommonProps<{
  formTitle: string;
  afterValidationCallback: () => void;
}>;

type TInputFormState = TAppState & {
  formHasInputErrors: boolean;
  apiResponseSuccess: string;
  apiResponseError: string;
};

export class InputForm<
  TEnumInputFiledsNames extends Record<string, string>
> extends Block<TInputFormProps, TInputFormState> {
  protected helpers: {
    enumInputFiledsNames: TEnumInputFiledsNames;
  };

  constructor(
    formTitle: string,
    enumInputFiledsNames: TEnumInputFiledsNames,
    mapInputToProps?: Record<string, TInputProps>,
    afterValidationCallback?: () => void
  ) {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    mapInputToProps = mapInputToProps ?? {};
    Object.values(enumInputFiledsNames).forEach((fieldName) => {
      const inputField = new Input({
        props: {
          ...(mapInputToProps![fieldName] ?? {}),
          componentName: `${fieldName} input with validation`,
          htmlWrapper: {
            componentAlias: "wrapped",
            htmlWrapperTemplate: `
              <div class="form-field">
                {{{ wrapped }}}
              </div>
              `,
          },
        },
      });

      children[`${fieldName}_child`] = inputField;
      refs[fieldName] = inputField;
    });

    const state = Object.values(enumInputFiledsNames).reduce(
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
        componentName: "Login Page",
        formTitle,
        afterValidationCallback: afterValidationCallback ?? (() => {}),
      },
      refs,
      state,
      helpers: {
        enumInputFiledsNames,
      },
    });
  }

  render() {
    return template(this.helpers.enumInputFiledsNames);
  }

  protected _preInitHook(): void {
    Object.values(this.refs).forEach((inputField: Input) => {
      inputField.refs.Form = this;
    });

    this._createSubmitButton(this.props.afterValidationCallback);

    super._preInitHook();
  }

  private _createSubmitButton(
    afterValidationCallback: () => void = () => {}
  ): void {
    const clearAPIResponseState = () => {
      this.state.apiResponseSuccess = "";
      this.state.apiResponseError = "";
    };
    const validateform = this._validateForm.bind(this);

    this.children.submitButton = new Button({
      props: {
        type: "button",
        label: "submit",
        htmlClass: "submit-button",
        events: {
          click: [
            () => {
              clearAPIResponseState.call(this);
              validateform();
              if (!this.state.formHasInputErrors) {
                console.log(
                  `Form filled correctly: ${JSON.stringify(
                    this.collectFormData()
                  )}`
                );
                afterValidationCallback.call(this);
              }
            },
          ],
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
}
