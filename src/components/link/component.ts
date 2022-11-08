import { Block } from "core/dom";
import template from "./template";

type LinkProps = WithComponentCommonProps<{
  label: string;
  href?: string;
}>;

export class Link extends Block<LinkProps> {
  protected render(): string {
    return template;
  }
}
