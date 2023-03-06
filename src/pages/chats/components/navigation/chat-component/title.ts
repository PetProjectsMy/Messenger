import { WithStoreTextComponent } from "hocs/components";

export class ChatTitle extends WithStoreTextComponent {
  private chatID: string;

  constructor(chatID: string) {
    const beforePropsAssignHook = function (this: ChatTitle) {
      this.chatID = chatID;
      const title = this.store!.getChatsDataByPath(`${this.chatID}.title`);
      this.props = {
        htmlClasses: ["chat-title"],
        text: title,
      };
    };

    super({ helpers: { beforePropsAssignHook } });
  }
}
