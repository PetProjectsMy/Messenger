import Block from "core/block";
import template from "./template";

export type ButtonProps = {
  label?: string;
  type?: string;
} & ComponentCommonProps;

export class Button extends Block {
  protected props: ButtonProps;

  constructor({
    props = { componentName: "Button" },
    refs = {},
    state = {},
  }: {
    props?: ButtonProps;
    refs?: ComponentRefs;
    state?: ComponentState;
  }) {
    super({ props, refs, state });
  }

  protected render(): string {
    return template;
  }
}
