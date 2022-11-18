import { WithStoreBlock } from "hocs/components";
import { isNullish } from "utils/objects-handle";
import { MessageComponent } from "./message";
import template from "./template";

const enum EnumChatAbsenceWarnings {
  NoChatsCreated = "NO CHATS CREATED",
  NoChatSelected = "NO CHAT SELECTED",
  NoMessagesWritten = "NO MESSAGES EXIST",
}

export class MessagesDisplayArea extends WithStoreBlock {
  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this.setChatAbsenceWarning();
    this.createMessagesList();
  }

  public setChatAbsenceWarning() {
    let warning = "";
    const { store } = this;

    if (!store.userHasAnyChats()) {
      warning = EnumChatAbsenceWarnings.NoChatsCreated;
    } else {
      const chatID = store.getCurrentChatID();
      if (isNullish(chatID)) {
        warning = EnumChatAbsenceWarnings.NoChatSelected;
      } else if (!this.store.chatHasMessages(chatID)) {
        const messages = this.store.getStateValueByPath(
          `chatMessages.${chatID}`
        );
        console.log(`CHAT(${chatID}): ${JSON.stringify(messages)}`);
        warning = EnumChatAbsenceWarnings.NoMessagesWritten;
      }
    }

    this.state.chatAbsenceWarning = warning;
  }

  public createMessagesList() {
    const chatID = this.store.getCurrentChatID();
    if (isNullish(chatID) || !this.store.chatHasMessages(chatID)) {
      this.children.messagesList = [];
      return;
    }

    const messages = this.store.getStateValueByPath(`chatsMessages.${chatID}`);
    const messagesList = [] as TComponentChildArray;

    for (const { content } of messages) {
      messagesList.push(new MessageComponent({ props: { content } }));
    }

    this.children.messagesList = messagesList;
  }

  protected render() {
    return template;
  }
}
