import { Block } from "core/dom";
import templateMaker from "./template";

type TTextComponentProps = ComponentTypings.WithCommonProps<{
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
    return templateMaker(this.props.htmlTag as string);
  }
}
