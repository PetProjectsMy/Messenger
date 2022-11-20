import { Block } from "core/dom";
import { Button } from "components/buttons";
import functionalButtonBackgroundImage from "static/functional-button.png";
import template from "./template";

export class ChatSectionHeader extends Block {
  constructor() {
    const children = {} as TComponentChildren;

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
          "background-image": functionalButtonBackgroundImage,
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
