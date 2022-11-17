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
      const currentChatID = store.getCurrentChatID();
      if (isNullish(currentChatID)) {
        warning = EnumChatAbsenceWarnings.NoChatSelected;
      } else {
        const lastMessage = store.getChatsDataByPath(
          `${currentChatID}.lastMessage`
        );
        if (isNullish(lastMessage)) {
          warning = EnumChatAbsenceWarnings.NoMessagesWritten;
        }
      }
    }

    this.state.chatAbsenceWarning = warning;
  }

  public createMessagesList() {
    const chatID = this.store.getCurrentChatID();
    if (isNullish(chatID)) {
      return;
    }

    const messages = this.store.getStateValueByPath(`chatsMessages.${chatID}`);
    if (isNullish(messages)) {
      return;
    }

    console.log(`MESSAGES: ${JSON.stringify(messages)}`);

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
