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
}
