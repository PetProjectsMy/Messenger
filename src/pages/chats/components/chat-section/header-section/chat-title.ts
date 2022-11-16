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

    if (!this.store.userHasAnyChats()) {
      this.props.text = "No chats created";
      return;
    }

    const chatID = this.store.getCurrentChatID();
    if (!chatID) {
      this.props.text = "No chat selected";
    } else {
      const title = this.store.getChatsDataByPath(`${chatID}.title`);
      this.props.text = title;
    }
  }

  public titleDidUpdate(newText: string) {
    this.props.text = newText;
  }
}
