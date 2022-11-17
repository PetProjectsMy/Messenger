import { WithStoreBlock } from "hocs/components";
import { getDescendantByPath } from "utils/pages";
import { SendMessageButton } from "./send-message-button";
import { AttachmentButton } from "./attachment-button";
import { MessageInput } from "./message-input";
import template from "./template";

export class MessageInputSection extends WithStoreBlock {
  constructor() {
    const children = {} as TComponentChildren;

    children.attachmentButton = new AttachmentButton();
    children.messageInput = new MessageInput();
    children.sendMessageButton = new SendMessageButton();

    super({ children });
  }

  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const messageInput = getDescendantByPath(this, ["messageInput"]);
    const sendMessageButton = getDescendantByPath(this, ["sendMessageButton"]);
    sendMessageButton.refs.messageInput = messageInput;
  }
}
