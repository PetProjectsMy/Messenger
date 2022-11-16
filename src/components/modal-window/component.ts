import { Button } from "components/buttons";
import { Block } from "core/dom";
import { toggleHtmlClass } from "utils/components";
import template from "./template";

export const enum EnumVisibleState {
  show = "show",
  hide = "hide",
}

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
              this.refs.modalWindow.toggleVisibility(EnumVisibleState.hide);
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

  toggleVisibility(state?: EnumVisibleState) {
    if (state === undefined) {
      toggleHtmlClass(this.props.htmlClasses!, "show-modal");
      return;
    }

    const classesList = this.props.htmlClasses as string[];
    const classesSet = new Set(this.props.htmlClasses as string[]);
    const oldSize = classesSet.size;
    if (state === EnumVisibleState.show) {
      classesSet.add("show-modal");
      if (classesSet.size > oldSize) {
        this.props.htmlClasses = [...classesList, "show-modal"];
      }
    } else if (state === EnumVisibleState.hide) {
      if (classesSet.delete("show-modal")) {
        this.props.htmlClasses = Array.from(classesSet);
      }
    }
  }

  public dispatchContent(component: Block) {
    this.children.content = component;
  }

  public getContentType() {
    return this.children.content.constructor.name;
  }
}
