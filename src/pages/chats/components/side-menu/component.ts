import { Button } from "components";
import { Block } from "core/dom";
import template from "./template";
import collapseButtonImage from "./collapse-button-image.png";

export class ChatsPageSideMenu extends Block {
  constructor() {
    const children = {} as TComponentChildren;
    children.collapseButton = new Button({
      props: {
        htmlStyle: {
          backgroundImage: collapseButtonImage,
        },
        htmlClasses: ["collapse-button"],
      },
    });

    children.createChatButton = new Button({
      props: {
        label: "create new chat",
        events: {
          click: [
            function () {
              this.refs.addChatModal.toggleModal();
            },
          ],
        },
      },
    });

    super({ props: { htmlStyle: { display: "none" } }, children });
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    (this.children.collapseButton as Block).dispatchEventListener(
      "click",
      function () {
        this.hide();
      }.bind(this)
    );
  }

  protected render() {
    return template;
  }
}
