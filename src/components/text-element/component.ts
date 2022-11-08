import { Block } from "core/dom";
import templator from "./template";

type TTextComponentProps = WithComponentCommonProps<{
  text?: string;
  htmlTag?: string;
}>;

export class TextComponent extends Block<TTextComponentProps> {
  protected props: TTextComponentProps;

  constructor({
    props = {},
    refs = {},
  }: {
    props?: TTextComponentProps;
    refs?: TComponentRefs;
  }) {
    props.htmlTag = props.htmlTag ?? "span";
    super({ props, refs });
  }

  protected render(): string {
    return templator(this.props.htmlTag as string);
  }
}
