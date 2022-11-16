import { Button } from "components/buttons";
import { Block } from "core/dom";
import template from "./template";

export class ModalWindow extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.closeButton = new Button({
      props: {
        htmlClasses: ["close-button"],
        label: "×",
        events: {
          click: [
            function () {
              this.refs.modalWindow.toggleVisibility("off");
            },
          ],
        },
      },
    });
    children.content = new Block();

    super({ children });
  }

  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    (this.children.closeButton as Block).refs.modalWindow = this;

    this.children = new Proxy(this.children, {
      set: function (target, childName: string, element) {
        target[childName] = element;
        this._componentDidUpdate("", "", true);
        return true;
      }.bind(this),
    });
  }

  private _createCloseButton() {
    return new Button({
      refs: {
        ModalWindow: this,
      },
      props: {
        htmlClasses: ["close-button"],
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
  }

  toggleVisibility(state?: Nullable<"on" | "off">) {
    this.toggleHtmlClass("show-modal", state);
  }

  public dispatchContent(component: Block) {
    this.children.content = component;
  }

  public getContentType() {
    return this.children.content.constructor.name;
  }
}
