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

    children.chatTitleInput = ModalWindow._createChatTitleInput();
    children.closeButton = ModalWindow._createCloseButton();

    super({ children, state });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    (this.children.closeButton as Block).refs.modalWindow = this;
    this._makeCreateChatButton();
  }

  private _makeCreateChatButton() {
    const refs = {
      titleInput: this.children.chatTitleInput as Block,
      modalWindow: this,
    };

    const afterRequestCallback = function (response: any) {
      if (!this.props.htmlClasses.includes("show-modal")) {
        this.props.htmlClasses.push("show-modal");
      }

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
              // afterRequestCallback({}); // DEBUG
              ChatsService.createChat(
                { title: titleInput.getValue() },
                afterRequestCallback
              );
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

  private static _createChatTitleInput() {
    return new Input({
      props: {
        htmlAttributes: {
          placeholder: "Enter Chat Title",
        },
      },
    });
  }

  private static _createCloseButton() {
    return new Button({
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
}
