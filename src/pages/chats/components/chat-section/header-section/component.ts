import { Block } from "core/dom";
import { Button } from "components";
import functionalButtonBackgroundImage from "static/functional-button.png";
import { ChatTitleComponent } from "./chat-title";
import template from "./template";

export class ChatSectionHeader extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.chatTitle = new ChatTitleComponent();
    children.functionalButton = ChatSectionHeader._createfunctionalButton();

    super({ children });
  }

  protected render() {
    return template;
  }

  private static _createfunctionalButton() {
    return new Button({
      props: {
        htmlClasses: ["functional-button"],
        htmlStyle: {
          backgroundImage: functionalButtonBackgroundImage,
        },
        events: {
          click: [
            function () {
              this.refs.sideMenu._element.style.display = "block";
            },
          ],
        },
      },
    });
  }
}
