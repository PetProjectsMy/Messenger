import { Button, Input } from "components";
import { Block } from "core/dom";
import template from "./template";

export class AvatarUploadForm extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    const avatarFileInput = new Input({
      props: {
        type: "file",
        accept: "image/*",
        htmlClass: "upload-avatar",
      },
    });
    children.avatarFileInput = avatarFileInput;

    children.avatarUploadButton = new Button({
      refs: {
        avatarInput: avatarFileInput,
      },
      props: {
        label: "upload avatar",
        htmlClass: "upload-avatar",
        events: {
          click: [
            function () {
              const fileInput = this.refs.avatarInput._element;
              fileInput.click();
            },
          ],
        },
      },
    });

    children.avatarSubmit = new Input({
      refs: {
        avatarInput: avatarFileInput,
      },
      state: {
        noFileSelected: true,
      },
      props: {
        type: "submit",
        value: "submit",
        htmlWrapper: {
          componentAlias: "wrappedAvatarSubmit",
          htmlWrapperTemplate: `
            <div class="submit-button-section">
              {{{ wrappedAvatarSubmit }}}
              \\{{#if noFileSelected }}
                 <span>  No file selected </span>
              \\{{/if}}
            </div>
          `,
        },
        events: {
          click: [
            function (event: Event) {
              event.preventDefault();
              const fileInput = this.refs.avatarInput._element;
              console.log(fileInput.files);
            },
          ],
        },
      },
    });

    super({ children });
  }

  protected render() {
    return template;
  }
}
