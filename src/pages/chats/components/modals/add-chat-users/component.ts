import { Block } from "core/dom";
import { Button, Input } from "components";
import { APIResponseHasError } from "utils/api";
import { ChatsService } from "services";
import template from "./template";

export class AddChatUsersModalWindow extends Block {
  readonly chatID: string;

  constructor({
    chatID,
    componentName,
  }: {
    chatID: string;
    componentName: string;
  }) {
    const state = {
      apiResponseSuccess: "",
      apiResponseError: "",
    };

    const children = {} as TComponentChildren;
    children.usersIdenifiersInput =
      AddChatUsersModalWindow._createUsersIdenifiersInput();

    const beforePropsAssignHook = function () {
      this.chatID = chatID;
    };

    super({
      children,
      state,
      componentName,
      helpers: { beforePropsAssignHook },
    });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this._createSubmitButton();
  }

  private _createSubmitButton() {
    const refs = {
      usersInput: this.children.usersIdenifiersInput as Block,
      modalWindow: this,
    };

    const afterRequestCallback = function (response: any) {
      if (APIResponseHasError(response)) {
        this.state.apiResponseError = response.reason;
      } else {
        this.state.apiResponseSuccess = "Uses added successfully";
        this.children.usersIdenifiersInput.setValue("");
      }
    }.bind(this);

    const submitButton = new Button({
      refs,
      props: {
        label: "add users",
        events: {
          click: [
            function () {
              const { usersInput, modalWindow } = this.refs;
              modalWindow.clearAPIResponseStatus();

              const { chatID } = modalWindow;
              console.log(`USERS INPUT: ${usersInput.getValue()}`);
              console.log(`CHAT ID: ${chatID}`);

              // ChatsService.createChat(
              //   { title: usersInput.getValue() },
              //   afterRequestCallback
              // );
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

  private static _createUsersIdenifiersInput() {
    return new Input({
      props: {
        htmlAttributes: {
          placeholder: "Enter Users ID Numbers",
        },
      },
    });
  }
}
