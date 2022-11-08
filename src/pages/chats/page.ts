import { Block } from "core/dom";
import { HomeButton, ImageComponent } from "components";
import avatarImagePlaceholder from "static/avatar-placeholder-chats.svg";
import { chatsPageTemplate } from "./template";
import ChatComponent from "./chat-component";

export class ChatsPage extends Block {
  constructor() {
    const children: { chats: ChatComponent[] } & TComponentChildren = {
      chats: [],
    };

    for (let i = 1; i <= 10; ++i) {
      children.chats.push(new ChatComponent());
    }

    children.homeButton = new HomeButton();
    children.avatarImage = new ImageComponent({
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
