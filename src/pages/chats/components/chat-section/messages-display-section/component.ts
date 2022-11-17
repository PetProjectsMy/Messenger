import { WithStoreBlock } from "hocs/components";
import { isNullish } from "utils/objects-handle";
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

  protected render() {
    return template;
  }
}
