import { Block } from "core/dom";
import { Button } from "components";
import { ProfileService } from "services";
import {
  APIResponseHasError,
  transformProfileAPIResponseToUserData as transformData,
} from "utils/api";
import template from "./template";

export class SubmitSection extends Block {
  constructor() {
    super({ state: { uploadingStatus: "" } });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const submitButton = this._createSubmitButton();
    this.children.submitButton = submitButton;
    submitButton.refs.submitSection = this;
  }

  private _createSubmitButton() {
    const afterRequestCallback = function (response: any) {
      let uploadingStatus = "Changed successfully";

      if (!APIResponseHasError(response)) {
        const userData = transformData(response);
        window.store.dispatch({
          user: userData,
        });
      } else {
        uploadingStatus = response.reason;
      }

      this.state.uploadingStatus = uploadingStatus;
    }.bind(this);

    const onClickCallback = function () {
      const { avatarInput, submitSection } = this.refs;
      const fileInput = avatarInput.children.fileInput._unwrappedElement;

      if (!fileInput.value) {
        submitSection.state.uploadingStatus = "File not selected";
        return;
      }

      const formData = new FormData(avatarInput._unwrappedElement);
      fileInput.value = "";
      ProfileService.changeUserAvatar(formData, afterRequestCallback);
    };

    return new Button({
      props: {
        label: "submit",
        events: {
          click: [onClickCallback],
        },
      },
    });
  }

  protected render(): string {
    return template;
  }
}
