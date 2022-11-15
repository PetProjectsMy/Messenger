import { Block } from "core/dom";
import template from "./template";

export type TButtonProps = WithComponentCommonProps<{
  label?: string;
  htmlAttributes?: {
    type?: string;
  };
}>;

export class Button extends Block<TButtonProps> {
  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.props.htmlAttributes!.type ??= "button";
  }

  protected render(): string {
    return template;
  }

  //  @ts-ignore 'toggleDisableState' is declared but its value is never read
  private _toggleDisableState() {
    const element = this._unwrappedElement as HTMLButtonElement;
    element.disabled = !element.disabled;
  }
}
