import { Block } from "core/dom";
import template from "./template";

export type TInputProps = WithComponentCommonProps<{
  htmlAttributes?: {
    value?: string;
    placeholder?: string;
    type?: string;
  };
}>;

export class Input extends Block<TInputProps> {
  protected render(): string {
    return template;
  }

  public getValue() {
    const element = this._unwrappedElement;
    return (element as HTMLInputElement).value;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.props.htmlAttributes!.value ??= "";
    this.props.htmlAttributes!.type ??= "text";
  }

  public toggleDisableState() {
    const element = this._unwrappedElement as HTMLInputElement;
    element.disabled = !element.disabled;
  }
}
