import Block from "core/block";
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
      },
    });

    children.message = new TextElement({
      props: {
        text: Array(3).fill("Last received message.").join(" "),
      },
    });

    super({ children });
  }

  protected render(): string {
    return chatElementTemplate;
  }
}
