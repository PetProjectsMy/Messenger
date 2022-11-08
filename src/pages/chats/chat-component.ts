import { Block } from "core/dom";
import { ImageComponent, TextComponent } from "components";
import avatarImagePlaceholder from "static/avatar-placeholder-chats.svg";
import { chatElementTemplate } from "./template";

export default class ChatComponent extends Block {
  constructor() {
    const children: TComponentChildren = {};

    children.avatarImage = new ImageComponent({
      props: {
        src: avatarImagePlaceholder,
        alt: "avatar placeholder",
        componentName: "Chat Component Avatar Image",
      },
    });

    children.message = new TextComponent({
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
