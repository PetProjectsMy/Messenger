import { Block } from "core/dom";
import templator from "./template";

type TetxElementProps = WithComponentCommonProps<{
  text?: string;
  htmlTag?: string;
}>;

export class TextElement extends Block<TetxElementProps> {
  protected props: TetxElementProps;

  constructor({
    props = {},
    refs = {},
  }: {
    props?: TetxElementProps;
    refs?: TComponentRefs;
  }) {
    props.htmlTag = props.htmlTag ?? "span";
    super({ props, refs });
  }

  protected render(): string {
    return templator(this.props.htmlTag as string);
  }
}
