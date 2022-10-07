import Block from "core/block";
import template from "./template";

export type ButtonProps = {
  label?: string;
  type?: string;
} & ComponentCommonProps;

export class Button extends Block {
  protected props: ButtonProps;

  constructor({
    props = {},
    refs = {},
  }: {
    props?: ButtonProps;
    refs?: ComponentRefs;
  }) {
    super({ props, refs });
  }

  protected render(): string {
    return template;
  }
}