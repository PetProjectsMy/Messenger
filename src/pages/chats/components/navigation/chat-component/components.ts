import { TextComponent, ImageComponent } from "components";
import avatarImagePlaceholder from "static/avatar-placeholder-chats.svg";
import { WithStoreBlock } from "hocs/components";
import template from "./template";

export class ChatComponent extends WithStoreBlock {
  // @ts-ignore
  public readonly chatID: string;

  constructor(chatID: string) {
    const children = {} as TComponentChildren;
    children.avatarImage = ChatComponent._createAvatarComponent(chatID);
    children.message = ChatComponent._createMessageComponent(chatID);

    const beforePropsAssignHook = function () {
      this.chatID = chatID;
    };

    super({ children, helpers: { beforePropsAssignHook } });
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
      },
    });

    return avatarImage;
  }

  private static _createMessageComponent(chatID: string) {
    const lastMessage = window.store.getChatsDataByPath(
      `${chatID}.lastMessage`
    );
    const text = lastMessage ? lastMessage.content : "No Messages Exist Now";

    return new TextComponent({
      props: {
        text,
      },
    });
  }

  protected _afterRenderHook(): void {
    super._afterRenderHook();

    const onclickCallback = function () {
      this.store.dispatch({ currentChatID: this.chatID });
    };

    this.dispatchEventListener("click", onclickCallback.bind(this));
  }
}
