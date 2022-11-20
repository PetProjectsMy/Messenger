import { Block } from "core/dom";
import { Button } from "components/buttons";
import { Input } from "components/inputs";
import { ChatsService } from "services/chats";
import { APIResponseHasError } from "utils/api";
import template from "./template";

export class CreateChatModalWindow extends Block {
  constructor(componentName: string) {
    const state = {
      apiResponseSuccess: "",
      apiResponseError: "",
    };
    const children = {} as TComponentChildren;

    children.chatTitleInput = CreateChatModalWindow._createChatTitleInput();

    super({
      children,
      state,
      componentName,
    });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this._createSubmitButton();
  }

  private _createSubmitButton() {
    const refs = {
      titleInput: this.children.chatTitleInput as Block,
      modalWindow: this,
    };

    const afterRequestCallback = function (response: any) {
      if (APIResponseHasError(response)) {
        this.state.apiResponseError = response.reason;
      } else {
        this.state.apiResponseSuccess = "Chat created successfully";
        this.children.chatTitleInput.setValue("");
      }
    }.bind(this);

    const submitButton = new Button({
      refs,
      props: {
        label: "Create",
        events: {
          click: [
            function () {
              const { titleInput, modalWindow } = this.refs;
              modalWindow.clearAPIResponseStatus();
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

    this.children.submitButton = submitButton;
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
