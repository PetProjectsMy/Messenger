import { Block } from "core/dom";
import { TextComponent, Button } from "components";
import functionalButtonBackgroundImage from "static/functional-button.png";
import template from "./template";

export class ChatSectionHeader extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.chatTitle = new TextComponent({
      props: {
        text: "Chat Title Placeholder",
        htmlClasses: ["chat-title"],
      },
    });

    children.functionalButton = new Button({
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

    super({ children });
  }

  protected render() {
    return template;
  }
}
