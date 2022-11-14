import { Button, Input } from "components";
import { Block } from "core/dom";
import template from "./template";

export class ModalWindow extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.chattTitleInput = new Input({
      props: {
        placeholder: "Enter Chat Title",
      },
    });

    children.createChatButton = new Button({
      props: {
        label: "Create",
      },
    });

    children.closeButton = new Button({
      props: {
        htmlClass: "close-button",
        label: "×",
        events: {
          click: [
            function () {
              this.refs.modalWindow.toggleModal();
            },
          ],
        },
      },
    });

    super({ children });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.children.closeButton.refs.modalWindow = this;
  }

  toggleModal() {
    this._element?.classList.toggle("show-modal");
  }

  protected render() {
    return template;
  }
}
