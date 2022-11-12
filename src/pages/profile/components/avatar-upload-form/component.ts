import { Button, FileInput, type ImageComponent } from "components";
import { Block } from "core/dom";
import { ProfileEditService } from "services";
import {
  APIResponseHasError,
  transformProfileChangeResponseToUserData as transformData,
} from "utils/api";
import template from "./template";

export class AvatarUploadForm extends Block {
  constructor(profilePageImageRef: ImageComponent) {
    const children = {} as TComponentChildren;

    const avatarChooseButton = new Button({
      props: {
        label: "upload avatar",
        htmlClass: "choose-avatar",
      },
    });
    children.avatarChooseButton = avatarChooseButton;

    const avatarFileInput = new FileInput({
      InputButtonRef: avatarChooseButton,
      onFileChangeCallback() {
        const fileInput = this._element;
        const submitState = this.refs.avatarSubmitButton.state;

        console.log(`FILE CHANGE`, fileInput.value);
        if (!fileInput.value) {
          submitState.uploadingStatus = "File not selected";
        } else {
          submitState.uploadingStatus = "File selected";
        }
      },
      props: {
        accept: "image/*",
        htmlName: "avatar",
        htmlClass: "upload-avatar",
      },
    });
    children.avatarFileInput = avatarFileInput;

    super({ children, refs: { profileImage: profilePageImageRef } });
  }

  private _createAvatarSubmitButton() {
    const refs = {
      form: this,
      avatarInput: this.children.avatarFileInput as Block,
    };

    const state = {
      uploadingStatus: "",
    };

    const afterRequestCallback = function (response: any) {
      let uploadingStatus = "Changed successfully";

      if (!APIResponseHasError(response)) {
        const userData = transformData(response);
        window.store.dispatch({
          user: userData,
        });

        this.refs.profileImage.props.src = userData.avatar;
      } else {
        uploadingStatus = response.reason;
      }

      this.children.avatarSubmitButton.state.uploadingStatus = uploadingStatus;
    }.bind(this);

    const onClickCallback = function () {
      const { form, avatarInput } = this.refs;
      const fileInput = avatarInput._element;

      if (!fileInput.value) {
        this.state.uploadingStatus = "File not selected";
        return;
      }

      const formData = new FormData(form._element);
      ProfileEditService.changeUserAvatar(formData, afterRequestCallback);
    };

    return new Button({
      refs,
      state,
      props: {
        label: "submit",
        htmlWrapper: {
          componentAlias: "wrapped",
          htmlWrapperTemplate: `
            <div class="submit-button-section">
              {{{ wrapped }}}
              \\{{#if uploadingStatus }}
                  <span>  \\{{ uploadingStatus }} </span>
              \\{{/if}}
            </div>
          `,
        },
        events: {
          click: [onClickCallback],
        },
      },
    });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const avatarSubmitButton = this._createAvatarSubmitButton();
    this.children.avatarSubmitButton = avatarSubmitButton;
    (this.children.avatarFileInput as Block).refs.avatarSubmitButton =
      avatarSubmitButton;
  }

  protected render() {
    return template;
  }
}
