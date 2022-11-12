import { Button, FileInput, type ImageComponent } from "components";
import { Block } from "core/dom";
import { ProfileEditService } from "services";
import {
  APIResponseHasError,
  transformProfileChangeAPIResponseToAppUserData as transformData,
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
        const submitState = this.refs.avatarSubmit.state;

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
      if (!APIResponseHasError(response)) {
        const userData = transformData(response);
        const oldAvatarURL = window.store.getUserData("avatar");
        window.store.dispatch({
          user: userData,
        });

        const newAvatarURL = userData.avatar;
        console.log(`OLD AVATAR: ${oldAvatarURL}; NEW AVATAR: ${newAvatarURL}`);
        this.refs.profileImage.componentDidUpdate(oldAvatarURL, newAvatarURL);
      }
    }.bind(this);

    const onClickCallback = function (event) {
      console.log(`CURRENT TARGET: ${event.currentTarget}`);
      const { form, avatarInput } = this.refs;
      const fileInput = avatarInput._element;

      if (!fileInput.value) {
        this.state.uploadingStatus = "File not selected";
        return;
      }

      console.log(`SUBMIT: ${fileInput.value}`);
      const formData = new FormData(form._element);
      for (const [name, value] of formData) {
        console.log(`FORM DATA ${name}: ${value}`);
      }
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

    const avatarSubmit = this._createAvatarSubmitButton();
    this.children.avatarSubmit = avatarSubmit;
    (this.children.avatarFileInput as Block).refs.avatarSubmit = avatarSubmit;
  }

  protected render() {
    return template;
  }
}
