import Block from "core/block";
import template from "./template";

export type InputValidator = (isErrorRenderNeeded?: boolean) => boolean;

export type InputInitProps = {
  placeholder?: string;
  type?: string;
  value?: string;
  validators?: Record<string, InputValidator>;
  disabledAttr?: boolean;
} & ComponentCommonProps;

export type InputProps = Omit<InputInitProps, "validators"> &
  ComponentCommonProps;

export class Input extends Block {
  protected props: InputProps;

  protected validators: Record<string, InputValidator>;

  constructor({
    props = { componentName: "Input" },
    refs = {},
  }: {
    props?: InputInitProps;
    refs?: ComponentRefs;
  }) {
    super({
      props: { ...props, error: "" },
      refs,
    });
  }

  protected render(): string {
    return template;
  }

  protected _preInitHook() {
    this._bindValidators();
    this.state = { previousValue: "" };
  }

  protected _preProxyHook() {
    const props = this.props as InputInitProps;
    this.validators = props.validators ?? {};
    delete props.validators;
  }

  protected _bindValidators() {
    Object.entries(this.validators).forEach(([event, validator]) => {
      const events = this.props.events as Record<
        string,
        ComponentEventListener[]
      >;

      if (!events[event]) {
        events[event] = [];
      }

      const bindedValidator = validator.bind(this);
      this.validators[event] = bindedValidator;
      events[event].push(bindedValidator);
    });
  }
}
