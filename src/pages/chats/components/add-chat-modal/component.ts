import { Button, Input } from "components";
import { Block } from "core/dom";
import { ChatsService } from "services/chats";
import { APIResponseHasError } from "utils/api";
import template from "./template";

export class ModalWindow extends Block {
  constructor() {
    const state = {
      apiResponseSuccess: "",
      apiResponseError: "",
    };
    const children = {} as TComponentChildren;

    children.chattTitleInput = new Input({
      props: {
        htmlAttributes: {
          placeholder: "Enter Chat Title",
        },
      },
    });

    children.closeButton = new Button({
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

    super({ children, state });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    (this.children.closeButton as Block).refs.modalWindow = this;
    this._makeCreateChatButton();
  }

  private _makeCreateChatButton() {
    const refs = {
      titleInput: this.children.chattTitleInput as Block,
      modalWindow: this,
    };

    const afterRequestCallback = function (response: any) {
      if (APIResponseHasError(response)) {
        this.state.apiResponseError = response.reason;
      } else {
        this.state.apiResponseSuccess = "Chat created successfully";
      }
    }.bind(this);

    const createChatButton = new Button({
      refs,
      props: {
        label: "Create",
        events: {
          click: [
            function () {
              const { titleInput, modalWindow } = this.refs;
              modalWindow.clearAPIResponseStatus();
              console.log(`TITLE INPUT: ${titleInput.getValue()}`);
              afterRequestCallback({});
              // ChatsService.createChat(
              //   { title: titleInput.getValue() },
              //   afterRequestCallback
              // );
            },
          ],
        },
      },
    });

    this.children.createChatButton = createChatButton;
  }

  toggleModal() {
    this._element?.classList.toggle("show-modal");
  }

  clearAPIResponseStatus() {
    this.state.apiResponseSuccess = "";
    this.state.apiResponseError = "";
  }

  protected render() {
    return template;
  }
}
