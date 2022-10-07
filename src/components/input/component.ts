import Block from "core/block";
import template from "./template";

type InputProps = {
  placeholder?: string;
  type?: string;
  value?: string;
} & ComponentCommonProps;

export class Input extends Block {
  protected props: InputProps;

  constructor({
    props = {},
    refs = {},
  }: {
    props?: InputProps;
    refs?: ComponentRefs;
  }) {
    super({ props, refs });
  }

  protected render(): string {
    return template;
  }
}
