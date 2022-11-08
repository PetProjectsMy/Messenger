import { Block } from "core/dom";
import { Input, Button } from "components";
import { TInputProps, TInputValidator } from "components/input/component";
import template from "./template";

type TInputFormProps = WithComponentCommonProps<{
  formTitle: string;
}>;

export class InputForm<
  TEnumInputFiledsNames extends Record<string, string>
> extends Block<TInputFormProps, TAppState & { formHasInputErrors: boolean }> {
  protected helpers: {
    enumInputFiledsNames: TEnumInputFiledsNames;
  };

  constructor(
    formTitle: string,
    enumInputFiledsNames: TEnumInputFiledsNames,
    mapInputToProps?: Record<string, TInputProps>,
    validators?: Record<
      string, // fieldName
      Record<string, TInputValidator[]> // { event: validatorsList}
    >
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
          validators: (validators ?? {})[fieldName],
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
    state.formHasInputErrors = true;
    console.log(`Input Form State${JSON.stringify(state)}`);

    super({
      children,
      props: {
        componentName: "Login Page",
        formTitle,
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

    this._createSubmitButton();

    super._preInitHook();
  }

  private _createSubmitButton(
    afterValidationCallback: () => void = () => {}
  ): void {
    const validateform = this._validateForm.bind(this);
    this.children.submitButton = new Button({
      props: {
        type: "button",
        label: "submit",
        htmlClass: "submit-button",
        events: {
          click: [
            function () {
              validateform();
              afterValidationCallback();
            },
          ],
        },
      },
    });
  }

  private _validateForm(): void {
    Object.values(this.refs).forEach((inputField: Input) => {
      const validators = inputField.getValidators();
      const validatorsByEvent = Object.values(validators);

      for (const eventValidators of validatorsByEvent) {
        for (const validator of eventValidators) {
          const validationResult = validator();
          if (!validationResult) {
            this.state.formHasInputErrors = true;
            return;
          }
        }
      }
    });
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
