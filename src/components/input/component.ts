import { Block } from "core/dom";
import template from "./template";

export type TInputValidator = (isFormRerenderNeeded?: boolean) => boolean;
export type TInputValidatorsByEvents = Record<string, TInputValidator[]>;

export type TInputProps = WithComponentCommonProps<{
  value?: string;
  placeholder?: string;
  type?: string;
  validators?: TInputValidatorsByEvents;
  disabledAttr?: boolean;
}>;

type TInputState = {
  inputError: string;
};
export class Input extends Block<TInputProps, TInputState> {
  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();
    this.state.inputError = "";
  }

  protected _beforePropsProxyHook() {
    super._beforePropsProxyHook();

    this.props.validators = this.props.validators ?? {};
    this._bindValidators();
  }

  protected _bindValidators() {
    if (this.props.validators === undefined) {
      throw new Error("validators prop is undefined");
    }

    const bindedValidators = {} as Record<string, TInputValidator[]>;
    Object.entries(this.props.validators).forEach(([event, validators]) => {
      const events = this.props.events as Record<
        string,
        ComponentEventHandler[]
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

  public getValue() {
    let element = this._element;
    if (this.htmlWrapped) {
      try {
        element = (element as HTMLElement).querySelector("input");
      } catch {
        if (!(element instanceof HTMLElement)) {
          throw new Error(
            `${
              this.componentName
            }: wrong element ${element} of type ${typeof element} to validate input`
          );
        }
      }
    }

    return (element as HTMLInputElement).value;
  }

  public toggleDisableState() {
    this.props.disabledAttr = !this.props.disabledAttr;
  }
}
