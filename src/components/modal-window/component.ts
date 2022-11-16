import { Button } from "components/buttons";
import { Block } from "core/dom";
import template from "./template";

export class ModalWindow extends Block {
  private contentType: string;

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
    this.contentType = "";
  }

  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    (this.children.closeButton as Block).refs.modalWindow = this;

    this.children = new Proxy(this.children, {
      set: function (
        target: TComponentChildren,
        childName: string,
        component: Block
      ) {
        if (childName === "content") {
          const oldContentType = this.contentType;

          target[childName] = component;
          this._componentDidUpdate("", "", true);

          this.contentType = component.componentName;
          console.log(
            `MODAL CONTENT: ${oldContentType} -> ${this.contentType}`
          );
        }

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
    return this.contentType;
  }
}
