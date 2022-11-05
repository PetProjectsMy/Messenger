import { Block } from "core/dom";
import { ImageElement, TextElement } from "components";
import avatarImagePlaceholder from "static/avatar-placeholder-chats.svg";
import { chatElementTemplate } from "./template";

export default class ChatComponent extends Block {
  constructor() {
    const children: ComponentChildren = {};

    children.avatarImage = new ImageElement({
      props: {
        src: avatarImagePlaceholder,
        alt: "avatar placeholder",
        componentName: "Chat Component Avatar Image",
      },
    });

    children.message = new TextElement({
      props: {
        text: Array(3).fill("Last received message.").join(" "),
        componentName: "Chat Component Message",
      },
    });

    super({ children });
  }

  protected render(): string {
    return chatElementTemplate;
  }
}
