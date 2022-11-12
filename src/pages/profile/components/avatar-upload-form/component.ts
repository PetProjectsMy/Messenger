import { Button, FileInput, Input } from "components";
import { Block } from "core/dom";
import template from "./template";

export class AvatarUploadForm extends Block {
  constructor() {
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

    super({ children });
  }

  protected _afterPropsAssignHook(): void {
    const avatarSubmit = new Input({
      refs: {
        form: this,
        avatarInput: this.children.avatarFileInput as Block,
      },
      state: {
        uploadingStatus: "",
      },
      props: {
        type: "submit",
        value: "submit",
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
          click: [
            function (event: Event) {
              event.preventDefault();

              const { form, avatarInput } = this.refs;
              const fileInput = avatarInput._element;
              console.log(fileInput.value);

              if (!fileInput.value) {
                this.state.uploadingStatus = "File not selected";
                return;
              }

              console.log(`SUBMIT: ${fileInput.value}`);
              const formData = new FormData(form._element);
            },
          ],
        },
      },
    });

    this.children.avatarSubmit = avatarSubmit;
    (this.children.avatarFileInput as Block).refs.avatarSubmit = avatarSubmit;
  }

  protected render() {
    return template;
  }
}
