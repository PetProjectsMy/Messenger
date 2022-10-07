import Block from "core/block";
import templator from "./template";

type TetxElementProps = {
  text?: string;
  htmlTag?: string;
} & ComponentCommonProps;

export class TextElement extends Block {
  protected props: TetxElementProps;

  constructor({
    props = {},
    refs = {},
  }: {
    props?: TetxElementProps;
    refs?: ComponentRefs;
  }) {
    props.htmlTag = props.htmlTag ?? "span";
    super({ props, refs });
  }

  protected render(): string {
    return templator(this.props.htmlTag);
  }
}
