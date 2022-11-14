import { Block } from "core/dom";
import { TextComponent, ImageComponent } from "components";
import avatarImagePlaceholder from "static/avatar-placeholder-chats.svg";
import template from "./template";

export class NavigationSectionChatComponent extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.message = new TextComponent({
      props: {
        text: Array(3).fill("Last received message.").join(" "),
        componentName: "Chat Component Message",
      },
    });

    children.avatarImage = new ImageComponent({
      props: {
        htmlAttributes: {
          src: avatarImagePlaceholder,
          alt: "avatar placeholder",
        },
        componentName: "Avatar Image",
      },
    });

    super({ children });
  }

  protected render() {
    return template;
  }
}
