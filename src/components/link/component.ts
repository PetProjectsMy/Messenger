import { Block } from "core/dom";
import template from "./template";

export type TLinkProps = ComponentTypings.WithCommonProps<{
  label: string;
  htmlAttributes?: {
    href?: string;
  };
}>;

export class Link extends Block<TLinkProps> {
  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.props.htmlAttributes!.href ??= "javascript:void(0);";
  }

  protected render(): string {
    return template;
  }
}
