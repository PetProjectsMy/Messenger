import { WithStoreTextComponent } from "hocs/components";

export class ChatTitleComponent extends WithStoreTextComponent {
  constructor() {
    super({
      props: {
        htmlClasses: ["chat-title"],
      },
    });
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this.assignCurrentChat();
  }

  public assignCurrentChat() {
    const store = this.store!;

    if (!store.userHasAnyChats()) {
      this.props.text = "No chats created";
      return;
    }

    let title = "No chat selected";
    const chatID = store.getCurrentChatID();
    if (chatID) {
      title = store.getChatsDataByPath(`${chatID}.title`);
    }

    this.props.text = title;
  }
}
