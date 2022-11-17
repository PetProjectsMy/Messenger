import { WithStoreBlock } from "hocs/components";
import { SendMessageButton } from "./send-message-button";
import { AttachmentButton } from "./attachment-button";
import { MessageInput } from "./message-input";
import template from "./template";

export class MessageInputSection extends WithStoreBlock {
  constructor() {
    const children = {} as TComponentChildren;

    children.attachmentButton = new AttachmentButton();
    const messageInput = new MessageInput();
    children.messageInput = messageInput;
    children.sendMessageButton = new SendMessageButton(messageInput);

    super({ children });
  }

  protected render(): string {
    return template;
  }
}
