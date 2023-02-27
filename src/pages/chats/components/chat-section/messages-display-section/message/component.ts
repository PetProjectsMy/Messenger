import { TextComponent } from "components/text-component";
import { Block } from "core/dom";
import template from "./template";

type TMessageComponentProps = ComponentTypings.WithCommonProps<{
  content: string;
}>;

export class MessageComponent extends Block<TMessageComponentProps> {
  constructor(message: string) {
    const children = {} as ComponentTypings.Children;

    children.content = new TextComponent({
      props: { text: message, htmlClasses: ["message-text"] },
    });

    super({ children });
  }

  protected render(): string {
    return template;
  }
}
