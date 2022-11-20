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

  public toggleDisabledState(state: boolean | undefined = undefined) {
    const element = this._unwrappedElement as HTMLButtonElement;

    if (state !== undefined) {
      element.disabled = state;
      return;
    }

    element.disabled = !element.disabled;
  }

  public click() {
    this._unwrappedElement!.click();
  }
}
