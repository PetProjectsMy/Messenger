import { Button, type Input } from "components";
import backgorundImage from "./icon.png";

export class MessageSendButton extends Button {
  constructor(messageInputref: Input) {
    super({
      props: {
        htmlClasses: ["send-message-button"],
        htmlStyle: {
          "background-image": backgorundImage,
        },
        events: {
          click: [
            function () {
              const messageInput = this.refs.messageInput as Input;
              console.log(`MESSAGE INPUT: ${messageInput.getValue()}`);
            },
          ],
        },
      },
      refs: { messageInput: messageInputref },
    });
  }
}
