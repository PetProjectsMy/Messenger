import { Block } from "core/dom";
import { TextComponent, ImageComponent } from "components";
import avatarImagePlaceholder from "static/avatar-placeholder-chats.svg";
import { WithStore } from "components/hocs";
import template from "./template";

export class NavigationSectionChatComponent extends Block {
  constructor(chadID: string) {
    const children = {} as TComponentChildren;
    children.avatarImage =
      NavigationSectionChatComponent._createAvatarComponent(chadID);
    children.message =
      NavigationSectionChatComponent._createMessageComponent(chadID);

    super({ children });
  }

  protected render() {
    return template;
  }

  private static _createAvatarComponent(chatID: string) {
    let avatarSrc = window.store.getChatsDataByPath(`${chatID}.avatar`);
    avatarSrc ??= avatarImagePlaceholder;

    const avatarImage = new ImageComponent({
      props: {
        htmlAttributes: {
          src: avatarSrc,
          alt: "avatar placeholder",
        },
        componentName: "Avatar Image",
      },
    });

    return avatarImage;
  }

  private static _createMessageComponent(chadID: string) {
    const lastMessage = window.store.getChatsDataByPath(
      `${chadID}.lastMessage`
    );
    const text = lastMessage ? lastMessage.content : "No Messages Exist Now";
    console.log(`LAST MESSAGE: ${JSON.stringify(lastMessage)}`);
    console.log(`TEXT: ${text}`);

    return new TextComponent({
      props: {
        text,
        componentName: "Chat Component Message",
      },
    });
  }
}
