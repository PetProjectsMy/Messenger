import { type Input } from "components";
import { WithStoreButton } from "hocs/components";
import { isNullish } from "utils/objects-handle";
import backgorundImage from "./icon.png";

export class SendMessageButton extends WithStoreButton {
  constructor(messageInputRef: Input) {
    super({
      props: {
        htmlClasses: ["send-message-button"],
        htmlStyle: {
          "background-image": backgorundImage,
        },
      },
      refs: {
        messageInput: messageInputRef,
      },
    });
  }

  protected _afterRenderHook(): void {
    super._afterRenderHook();

    this.assignCurrentChat();
  }

  public assignCurrentChat() {
    const store = this.store!;

    const currentChatID = store.getCurrentChatID();
    const messageInput = this.refs.messageInput as Input;
    const webSocket = store.getSocketByChatID(currentChatID);

    if (isNullish(currentChatID)) {
      this.setPropByPath("events.click", []);
      this.toggleDisabledState(true);
    } else {
      this.setPropByPath("events.click", [
        function () {
          const message = messageInput.getValue();
          console.log(
            `MESSAGE: ${message}, CHAT: ${currentChatID}, WEBSOCKET: ${webSocket.chatID}`
          );
          webSocket.send(message);
        },
      ]);
    }
  }
}
