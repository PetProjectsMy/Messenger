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
        htmlClasses: ["attachment-button"],
        htmlStyle: {
          backgroundImage: attachmentButtonBackgorundImage,
        },
      },
    });

    children.sendMessageButton = new Button({
      props: {
        htmlClasses: ["send-message-button"],
        htmlStyle: {
          backgroundImage: sendMessageButtonBackgorundImage,
        },
      },
    });

    super({ children });
  }

  protected render(): string {
    return template;
  }
}
