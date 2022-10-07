import Block from "core/block";
import template from "./template";

type LinkProps = {
  label: string;
  href?: string;
} & ComponentCommonProps;

export class Link extends Block {
  protected props: LinkProps;

  constructor({
    props,
    refs = {},
  }: {
    props: LinkProps;
    refs?: ComponentRefs;
  }) {
    super({ props, refs });
  }

  protected render(): string {
    return template;
  }
}
