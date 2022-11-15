import { Block } from "core/dom";
import templator from "./template";

type TTextComponentProps = WithComponentCommonProps<{
  text?: string;
  htmlTag?: string;
}>;

export class TextComponent extends Block<TTextComponentProps> {
  protected props: TTextComponentProps;

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this.props.htmlTag ??= "span";
  }

  protected render(): string {
    return templator(this.props.htmlTag as string);
  }
}
