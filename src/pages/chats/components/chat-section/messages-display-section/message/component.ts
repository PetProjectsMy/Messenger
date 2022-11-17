import { Block } from "core/dom";
import template from "./template";

type TMessageComponentProps = WithComponentCommonProps<{
  content: string;
}>;

export class MessageComponent extends Block<TMessageComponentProps> {
  protected render(): string {
    return template;
  }
}
