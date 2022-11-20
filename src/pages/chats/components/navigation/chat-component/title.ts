import { WithStoreTextComponent } from "hocs/components";

export class ChatTitle extends WithStoreTextComponent {
  // @ts-ignore 'chatID' is declared but its value is never read
  private chatID: string;

  constructor(chatID: string) {
    const beforePropsAssignHook = function () {
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
