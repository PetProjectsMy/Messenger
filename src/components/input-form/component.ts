import { Block } from "core/dom";
import { Input, Button } from "components";
import { TInputProps } from "components/input/component";
import template from "./template";

type TInputFormProps = WithComponentCommonProps<{
  formTitle: string;
  afterValidationCallback: () => void;
}>;

export class InputForm<
  TEnumInputFiledsNames extends Record<string, string>
> extends Block<
  TInputFormProps,
  TAppState & {
    formHasInputErrors: boolean;
    apiResponseSuccess: string;
    apiResponseError: string;
  }
> {
  protected helpers: {
    enumInputFiledsNames: TEnumInputFiledsNames;
  };

  constructor(
    formTitle: string,
    enumInputFiledsNames: TEnumInputFiledsNames,
    mapInputToProps?: Record<string, TInputProps>,
    afterValidationCallback?: () => void
  ) {
    console.log(`CREATE INPUT FORM`);

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
    console.log(`Input Form State${JSON.stringify(state)}`);

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
              afterValidationCallback.call(this);
            },
          ],
        },
      },
    });
  }

  private _validateForm(): void {
    let formHasInputErrors = false;

    Object.values(this.refs).forEach((inputField: Input) => {
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

    this.state.formHasInputErrors = formHasInputErrors;
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
