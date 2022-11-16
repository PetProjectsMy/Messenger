import { WithStore } from "hocs";
import { TextComponent } from "components";

export class ChatTitleComponent extends WithStore(TextComponent) {
  constructor() {
    super({
      props: {
        htmlClasses: ["chat-title"],
      },
    });
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();
    this.setCurrentChatTitle();
  }

  public setCurrentChatTitle() {
    if (!this.store.userHasAnyChats()) {
      this.props.text = "No chats created";
      return;
    }

    let title = "No chat selected";
    const chatID = this.store.getCurrentChatID();
    if (chatID) {
      title = this.store.getChatsDataByPath(`${chatID}.title`);
    }

    this.props.text = title;
  }
}
