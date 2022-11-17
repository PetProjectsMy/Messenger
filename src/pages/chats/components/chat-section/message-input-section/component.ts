import { WithStoreBlock } from "hocs/components";
import { type Button, Input } from "components";
import { MessageSendButton } from "./message-send-button";
import { AttachmentButton } from "./attachment-button";
import template from "./template";

export class MessageInputSection extends WithStoreBlock {
  constructor() {
    const children = {} as TComponentChildren;

    children.attachmentButton = new AttachmentButton();
    const messageInput = MessageInputSection._createMessageInput();
    children.messageInput = messageInput;
    children.sendMessageButton = new MessageSendButton(messageInput);

    super({ children });
  }

  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const chatID = this.store.getCurrentChatID();
    if (!chatID) {
      Object.values(this.children).forEach((child: Button | Input) => {
        child.toggleDisabledState();
      });
    }
  }

  private static _createMessageInput() {
    return new Input({
      props: {
        htmlAttributes: { name: "message", placeholder: "Enter Message" },
      },
    });
  }
}
