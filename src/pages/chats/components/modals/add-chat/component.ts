import { Block } from "core/dom";
import { Button, Input } from "components";
import { ChatsService } from "services/chats";
import { APIResponseHasError } from "utils/api";
import { ModalWindow } from "../modal-window";
import template from "./template";

export class AddChatModalWindow extends Block {
  constructor() {
    const state = {
      apiResponseSuccess: "",
      apiResponseError: "",
    };
    const children = {} as TComponentChildren;

    children.chatTitleInput = AddChatModalWindow._createChatTitleInput();

    super({ children, state });

    ModalWindow.dispatchContent(this);
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this._makeCreateChatButton();
  }

  private _makeCreateChatButton() {
    const refs = {
      titleInput: this.children.chatTitleInput as Block,
      modalContent: this,
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
              const { titleInput, modalContent } = this.refs;
              modalContent.clearAPIResponseStatus();
              console.log(`TITLE INPUT: ${titleInput.getValue()}`);
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
}
