import { Button } from "components/buttons";
import { Input } from "components/inputs";
import { Block } from "core/dom";
import { ChatsService } from "services/api/chats";
import { APIResponseHasError } from "utils/api";
import { transformAddUsersFormDataToAPI } from "utils/api/to-api-data-transformers";
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

    const children = {} as ComponentTypings.Children;
    children.usersIdentifiersInput =
      AddChatUsersModalWindow._createUsersIdentifiersInput();

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
      usersInput: this.children.usersIdentifiersInput as Block,
      modalWindow: this,
    };

    const afterRequestCallback = function (response: any) {
      if (APIResponseHasError(response)) {
        this.state.apiResponseError = response.reason;
      } else {
        this.state.apiResponseSuccess = "Users added successfully";
        this.children.usersIdentifiersInput.setValue("");
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
              const usersList = usersInput.getValue().split(",");
              const apiData = transformAddUsersFormDataToAPI({
                chatID,
                usersList,
              });

              console.log(
                `ADD USERS DATA: ${apiData.chatId}, ${apiData.users}`
              );

              ChatsService.addUsersToChat(apiData, afterRequestCallback);
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

  private static _createUsersIdentifiersInput() {
    return new Input({
      props: {
        htmlAttributes: {
          placeholder: "Enter Users ID Numbers",
        },
      },
    });
  }
}
