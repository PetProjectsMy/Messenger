import { WithStoreBlock } from "hocs/components";
import { Button, Input } from "components";
import template from "./template";
import attachmentButtonBackgorundImage from "./icons/attachment_button.png";
import sendMessageButtonBackgorundImage from "./icons/send-message-button.png";

export class MessageInputSection extends WithStoreBlock {
  constructor() {
    const children = {} as TComponentChildren;

    children.attachmentButton = MessageInputSection._createAttachmentButton();
    children.sendMessageButton = MessageInputSection._createSendMessageButton();
    children.messageInput = MessageInputSection._createMessageInput();

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

  private static _createAttachmentButton() {
    return new Button({
      props: {
        htmlClasses: ["attachment-button"],
        htmlStyle: {
          "background-image": attachmentButtonBackgorundImage,
        },
      },
    });
  }

  private static _createSendMessageButton() {
    return new Button({
      props: {
        htmlClasses: ["send-message-button"],
        htmlStyle: {
          "background-image": sendMessageButtonBackgorundImage,
        },
      },
    });
  }

  private static _createMessageInput() {
    return new Input({
      props: {
        htmlAttributes: { name: "message", placeholder: "Enter Message" },
      },
    });
  }
}
