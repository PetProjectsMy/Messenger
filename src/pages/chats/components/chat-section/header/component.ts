import { Block } from "core/dom";
import { ImageComponent } from "components";
import avatarImagePlaceholder from "static/avatar-placeholder-chats.svg";
import template from "./template";

export class ChatSectionHeader extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.chatAvatar = new ImageComponent({
      props: {
        src: avatarImagePlaceholder,
        alt: "avatar placeholder",
        componentName: "Chat Component Avatar Image",
      },
    });

    super({ children });
  }

  protected render() {
    return template;
  }
}
