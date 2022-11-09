import { Block } from "core/dom";
import { Input, Button } from "components";
import { TInputProps } from "components/input/component";
import { deepMerge } from "utils/objects-handle";
import template from "./template";

type TInputFormProps = WithComponentCommonProps<{
  formTitle?: string;
  afterValidationCallback?: () => void;
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
    enumInputFieldsNames: TEnumInputFiledsNames;
  };

  constructor({
    enumInputFieldsNames,
    mapInputToProps = {},
    mapInputToHelpers = {},
    props = {},
  }: {
    enumInputFieldsNames: TEnumInputFiledsNames;
    mapInputToProps?: Record<string, TInputProps>;
    mapInputToHelpers?: Record<string, TComponentHelpers>;
    props?: TInputFormProps;
    afterValidationCallback?: () => void;
  }) {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    Object.values(enumInputFieldsNames).forEach((fieldName) => {
      console.log(
        `MAPPED PROPS WRAPPER: ${JSON.stringify(
          mapInputToProps![fieldName].htmlWrapper
        )}`
      );
      const inputField = new Input({
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
      },
    });
  }

  render() {
    return template(this.helpers.enumInputFieldsNames);
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    Object.values(this.refs).forEach((inputField: Input) => {
      inputField.refs.Form = this;
    });

    if (!this.children.submitButton) {
      this.children.submitButton = this._createSubmitButton(
        this.props.afterValidationCallback
      );
    }
  }

  private _createSubmitButton(
    afterValidationCallback: () => void = () => {}
  ): Button {
    const clearAPIResponseState = () => {
      this.state.apiResponseSuccess = "";
      this.state.apiResponseError = "";
    };
    const validateform = this._validateForm.bind(this);

    return new Button({
      props: {
        type: "button",
        label: "submit",
        htmlClass: "submit-button",
        events: {
          click: [
            () => {
              clearAPIResponseState.call(this);
              validateform();
              afterValidationCallback.call(this); // DEBUG
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
