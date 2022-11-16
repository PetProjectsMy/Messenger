import { WithStoreBlock } from "hocs/components";
import template from "./template";

const enum EnumChatAbsenceWarnings {
  NoChatsCreated = "NO CHATS CREATED",
  NoChatSelected = "NO CHAT SELECTED",
}

export class MessagesDisplayArea extends WithStoreBlock {
  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this.setChatAbsenceWarning();
  }

  public setChatAbsenceWarning() {
    let warning = "";
    if (!this.store.userHasAnyChats()) {
      warning = EnumChatAbsenceWarnings.NoChatsCreated;
    } else if (!this.store.getCurrentChatID()) {
      warning = EnumChatAbsenceWarnings.NoChatSelected;
    }

    this.state.chatAbsenceWarning = warning;
  }

  protected render() {
    return template;
  }
}
