import { Button } from "components";
import { Block } from "core/dom";
import template from "./template";
import attachmentButtonBackgorundImage from "./icons/attachment_button.png";
import sendMessageButtonBackgorundImage from "./icons/send-message-button.png";

export class MessageInputSection extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.attachmentButton = new Button({
      props: {
        htmlClass: "attachment-button",
        backgroundImage: attachmentButtonBackgorundImage,
      },
    });

    children.sendMessageButton = new Button({
      props: {
        htmlClass: "send-message-button",
        backgroundImage: sendMessageButtonBackgorundImage,
      },
    });

    super({ children });
  }

  protected render(): string {
    return template;
  }
}
