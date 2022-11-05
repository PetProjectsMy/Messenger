import { Block } from "core/dom";
import template from "./template";

export type ButtonProps = WithCommonProps<{
  label?: string;
  type?: string;
}>;

export class Button extends Block<ButtonProps> {
  protected render(): string {
    return template;
  }
}
