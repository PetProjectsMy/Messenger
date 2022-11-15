import { WithStoreBlock } from "components/hocs";
import template from "./template";

const enum EnumChatAbsenceWarnings {
  NoChatsCreated = "NO CHATS CREATED",
  NoChatSelected = "NO CHAT SELECTED",
}

export class MessagesDisplayArea extends WithStoreBlock {
  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this._setChatAbsenceWarning();
  }

  private _setChatAbsenceWarning() {
    let warning = "";
    if (!this.store.userHasAnyChats()) {
      warning = EnumChatAbsenceWarnings.NoChatsCreated;
    } else if (!this.store.getCurrentChatID()) {
      warning = EnumChatAbsenceWarnings.NoChatSelected;
    }

    this.state.chatAbsenceWarning = warning;
  }

  public removeChatAbsenceWarning() {
    this.state.chatAbsenceWarning = "";
  }

  protected render() {
    return template;
  }
}
