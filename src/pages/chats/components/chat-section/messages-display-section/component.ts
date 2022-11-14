import { Block } from "core/dom";
import { WithStore } from "components/hocs";
import template from "./template";

const enum EnumChatAbsenceWarnings {
  NoChatsCreated = "NO CHATS CREATED",
  NoChatSelected = "NO CHAT SELECTED",
}

export class MessagesDisplayArea extends WithStore(Block) {
  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this._setChatAbsenceWarning();
  }

  private _setChatAbsenceWarning() {
    let warning = "";

    if (!this.store.userHasAnyChats()) {
      warning = EnumChatAbsenceWarnings.NoChatsCreated;
    } else if (!localStorage.currentChat) {
      warning = EnumChatAbsenceWarnings.NoChatSelected;
    }

    this.state.chatAbsenceWarning = warning;
  }

  protected render() {
    return template;
  }
}
