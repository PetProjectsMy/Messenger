import { Block } from "core/dom";
import template from "./template";

export type TLinkProps = WithComponentCommonProps<{
  label: string;
  href?: string;
}>;

export class Link extends Block<TLinkProps> {
  protected render(): string {
    return template;
  }
}
