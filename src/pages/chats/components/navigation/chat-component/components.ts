import { ImageComponent, TextComponent } from "components";
import { WithStoreBlock } from "hocs/components";
import avatarPlaceholder from "./avatar-placeholder.svg";
import template from "./template";

export class ChatComponent extends WithStoreBlock {
  // @ts-ignore
  public readonly chatID: string;

  constructor(chatID: string) {
    const children = {} as TComponentChildren;
    children.avatarImage = ChatComponent._createAvatarComponent(chatID);
    children.chatTitle = ChatComponent._createChatTitle(chatID);

    const beforePropsAssignHook = function () {
      this.chatID = chatID;
    };

    const afterRenderHook = function () {
      if (this.chatID === this.store.getCurrentChatID()) {
        this.toggleHtmlClass("current-chat", "on");
      }
    };

    super({ children, helpers: { beforePropsAssignHook, afterRenderHook } });
  }

  protected render() {
    return template;
  }

  private static _createAvatarComponent(chatID: string) {
    let avatarSrc = window.store.getChatsDataByPath(`${chatID}.avatar`);
    avatarSrc ??= avatarPlaceholder;

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

  private static _createChatTitle(chatID: string) {
    const title = window.store.getChatsDataByPath(`${chatID}.title`);

    const chatTitle = new TextComponent({
      props: {
        htmlClasses: ["chat-title"],
        text: title,
      },
    });

    return chatTitle;
  }

  protected _afterRenderHook(): void {
    super._afterRenderHook();

    const onclickCallback = function () {
      this.store.dispatch({ currentChatID: this.chatID });
    };

    this.dispatchEventListener("click", onclickCallback.bind(this));
  }
}
