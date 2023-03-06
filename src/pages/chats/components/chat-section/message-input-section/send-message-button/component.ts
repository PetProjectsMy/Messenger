import { WithStoreButton } from "hocs/components";
import { isNullish } from "utils/objects-handle";
import backgroundImage from "./icon.png";

export class SendMessageButton extends WithStoreButton {
  constructor(messageInputRef: ComponentTypings.Input) {
    super({
      props: {
        htmlClasses: ["send-message-button"],
        htmlStyle: {
          "background-image": backgroundImage,
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
    const isChatSelected = !isNullish(currentChatID);

    const messageInput = this.refs.messageInput as ComponentTypings.Input;
    const webSocket = store.getSocketByChatID(currentChatID, true);
    console.log(
      `CHAT(${currentChatID}) Websocket: ${JSON.stringify(webSocket)}`
    );

    if (isChatSelected) {
      this.setPropByPath("events.click", [
        function () {
          const message = messageInput.getValue();
          if (message === "") {
            return;
          }

          webSocket.send(message);
          messageInput.setValue("");
        },
      ]);
    } else {
      this.setPropByPath("events.click", []);
    }

    this.toggleDisabledState(!isChatSelected);
  }
}
