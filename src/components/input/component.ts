import { Block } from "core/dom";
import template from "./template";

export type InputValidator = (isErrorRenderNeeded?: boolean) => boolean;

export type InputProps = WithCommonProps<{
  placeholder?: string;
  type?: string;
  value?: string;
  validators?: Record<string, InputValidator>;
  disabledAttr?: boolean;
}>;

type InputState = {
  previousValue: string;
  error: string;
};
export class Input extends Block<InputProps, InputState> {
  protected render(): string {
    return template;
  }

  protected _preInitHook() {
    this.state = { previousValue: "", error: "" };
  }

  protected _preProxyHook() {
    this.props.validators = this.props.validators ?? {};
    this._bindValidators();
  }

  protected _bindValidators() {
    if (this.props.validators === undefined) {
      throw new Error("validators prop is undefined");
    }

    Object.entries(this.props.validators).forEach(([event, validator]) => {
      const events = this.props.events as Record<
        string,
        ComponentEventHandler[]
      >;

      if (!events[event]) {
        events[event] = [];
      }

      const bindedValidator = validator.bind(this);
      this.props.validators![event] = bindedValidator;
      events[event].push(bindedValidator);
    });
  }

  public getValidators() {
    return this.props.validators as Record<string, InputValidator>;
  }

  public toggleDisableState() {
    this.props.disabledAttr = !this.props.disabledAttr;
  }
}
