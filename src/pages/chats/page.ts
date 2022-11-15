import Block from "core/block";
import { HomeButton, ImageElement } from "components";
import avatarImagePlaceholder from "static/avatar-placeholder-chats.svg";
import { chatsPageTemplate } from "./template";
import ChatComponent from "./chat-component";

export class ChatsPage extends Block {
  constructor() {
    const children: { chats: ChatComponent[] } & ComponentChildren = {
      chats: [],
    };

    for (let i = 1; i <= 10; ++i) {
      children.chats.push(new ChatComponent());
    }

    children.homeButton = new HomeButton();
    children.avatarImage = new ImageElement({
      props: {
        src: avatarImagePlaceholder,
        alt: "avatar placeholder",
        componentName: "Avatar Image",
      },
    });

    super({ children, props: { componentName: "Chats Page" } });
  }

  protected render(): string {
    return chatsPageTemplate;
  }
}
