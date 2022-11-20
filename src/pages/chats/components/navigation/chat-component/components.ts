import { WithStoreBlock } from "hocs/components";
import { ChatAvatar } from "./avatar";
import { ChatTitle } from "./title";
import template from "./template";

export class ChatComponent extends WithStoreBlock {
  // @ts-ignore
  public readonly chatID: string;

  constructor(chatID: string) {
    const children = {} as TComponentChildren;
    children.avatarImage = new ChatAvatar(chatID);
    children.chatTitle = new ChatTitle(chatID);

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

  protected _afterRenderHook(): void {
    super._afterRenderHook();

    const onclickCallback = function () {
      this.store.dispatch({ currentChatID: this.chatID });
    };

    this.dispatchEventListener("click", onclickCallback.bind(this));
  }
}
