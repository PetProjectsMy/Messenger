import { Block } from "core/dom";
import template from "./template";

export type TButtonProps = WithComponentCommonProps<{
  label?: string;
  type?: string;
}>;

export class Button extends Block<TButtonProps> {
  protected render(): string {
    return template;
  }
}
