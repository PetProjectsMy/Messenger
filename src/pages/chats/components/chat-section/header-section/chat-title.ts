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

    const chatID = this.store.getCurrentChatID();
    if (!chatID) {
      this.props.text = "No chat selected";
    } else {
      this.props.text = this.store.getChatsDataByPath(`${chatID}.title`);
    }
  }

  public titleDidUpdate(newText: string) {
    this.props.text = newText;
  }
}
