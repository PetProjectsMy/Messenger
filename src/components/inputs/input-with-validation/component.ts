import { TInputProps, Input } from "components/inputs";

export type TInputValidator = () => boolean;
export type TInputValidatorsByEvents = Record<string, TInputValidator[]>;
export type TInputWithValidationProps = TInputProps & {
  validators?: TInputValidatorsByEvents;
};

type TInputWithValidationState = {
  inputError: string;
};

const InputExtended = Input as any as BlockClass<
  TInputWithValidationProps,
  TInputWithValidationState
>;

export class InputWithValidation extends InputExtended {
  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();
    this.state.inputError = "";
    this.props.htmlWrapper ??= {
      componentAlias: "wrapped",
      htmlWrapperTemplate: `
      <div class="input-with-validation-block">
        {{{ wrapped }}}
        \\{{#if inputError}}
          <span class="input-error"> \\{{ inputError }} </span>
        \\{{/if}}
      </div>
      `,
    };
  }

  protected _beforePropsProxyHook() {
    super._beforePropsProxyHook();

    this.props.validators = this.props.validators ?? {};
    this._bindValidators();
  }

  protected _bindValidators() {
    const bindedValidators = {} as Record<string, TInputValidator[]>;
    Object.entries(this.props.validators!).forEach(([event, validators]) => {
      const events = this.props.events as Record<
        string,
        TComponentEventHandler[]
      >;

      if (!events[event]) {
        events[event] = [];
      }
      bindedValidators[event] = [];

      validators.forEach((validator) => {
        const bindedValidator = validator.bind(this);
        bindedValidators[event].push(bindedValidator);
        events[event].push(bindedValidator);
      });
    });

    this.props.validators = bindedValidators;
  }

  public getValidators() {
    return this.props.validators as Record<string, TInputValidator[]>;
  }
}
