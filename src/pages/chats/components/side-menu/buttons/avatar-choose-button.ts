import { WithStoreFileInput } from "hocs/components";
import { ChatsService } from "services";

export class AvatarChooseButton extends WithStoreFileInput {
  constructor() {
    const afterRenderHook = function () {
      if (!this.store.getCurrentChatID()) {
        this.children.chooseButton.toggleDisabledState(true);
      }
    };

    super({
      fileInputProps: {
        htmlAttributes: {
          name: "avatar",
        },
        events: {
          change: [
            async function () {
              const { form } = this.refs;
              const fileInput = this._unwrappedElement;

              console.log(`FILE: ${fileInput.value}`);
              if (!fileInput.value) {
                return;
              }
              const avatarForm = new FormData(form._unwrappedElement);
              for (const [name, value] of avatarForm) {
                console.log(`NAME: ${name}, VALUE: ${value}`);
              }

              const chatID = window.store.getCurrentChatID();
              await ChatsService.changeAvatar(chatID, avatarForm);
            },
          ],
        },
      },
      chooseButtonProps: {
        label: "choose avatar",
      },
      props: {
        htmlClasses: ["choose-chat-avatar"],
      },
      helpers: {
        afterRenderHook,
      },
    });
  }
}
