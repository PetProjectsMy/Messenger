import { Button } from "components/buttons";
import { Block } from "core/dom";
import template from "./template";

export class ModalWindow extends Block {
  private contentType: string;

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.contentType = "";

    this.children.closeButton = this._createCloseButton();
    this.children.content = new Block();
  }

  private _createCloseButton() {
    return new Button({
      refs: {
        modalWindow: this,
      },
      props: {
        htmlClasses: ["close-button"],
        label: "×",
        events: {
          click: [
            function () {
              this.refs.modalWindow.toggleVisibility();
            },
          ],
        },
      },
    });
  }

  protected render(): string {
    return template;
  }

  public getContentType() {
    return this.contentType;
  }

  public setContent(newContentBlock: Block) {
    const oldContentType = this.contentType;
    const newContentType = newContentBlock.componentName;
    console.log(`MODAL CONTENT: ${oldContentType} -> ${newContentType}`);

    this.setChildByPath("content", newContentBlock);
  }

  toggleVisibility(state?: Nullable<"on" | "off">) {
    this.toggleHtmlClass("show-modal", state);
  }
}
