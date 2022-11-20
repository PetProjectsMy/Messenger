import { WithStoreBlock } from "hocs/components";
import { isNullish } from "utils/objects-handle";
import { MessageComponent } from "../message";
import template from "./template";

export class MessagesList extends WithStoreBlock {
  private readonly chatID: string;

  constructor(chatID: string) {
    const beforePropsAssignHook = function () {
      this.chatID = chatID;
    };

    super({ helpers: { beforePropsAssignHook } });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const { chatID } = this;
    if (isNullish(chatID) || !this.store.chatHasMessages(chatID)) {
      this.children.messages = [];
      return;
    }

    const messages = this.store.getStateValueByPath(`chatsMessages.${chatID}`);
    const messagesList = [] as TComponentChildArray;

    for (const { content } of messages) {
      messagesList.push(new MessageComponent(content));
    }

    this.children.messages = messagesList;
  }

  public jumpToScrollBottom() {
    const element = this._unwrappedElement!;
    element.scrollTop = element.scrollHeight;
  }

  protected render() {
    return template;
  }
}
