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

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const sendMessageButton = this.getChildByPath("sendMessageButton");
    const messageInput = this.getChildByPath("messageInput");
    messageInput.refs.sendMessageButton = sendMessageButton;
  }

  protected render(): string {
    return template;
  }
}
