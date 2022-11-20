import { WithStoreFileInput } from "hocs/components";
import { ChatsService } from "services";

export class AvatarChooseButton extends WithStoreFileInput {
  constructor() {
    const afterRenderHook = function () {
      if (!this.store.getCurrentChatID()) {
        this.children.chooseButton.toggleDisabledState(true);
      }
    };

    const onchangeCallback = async function () {
      const { form } = this.refs;
      const fileInput = this._unwrappedElement;

      if (!fileInput.value) {
        return;
      }
      const avatarForm = new FormData(form._unwrappedElement);
      const chatID = window.store.getCurrentChatID();
      avatarForm.append("chatId", chatID);

      await ChatsService.changeAvatar(avatarForm);
    };

    super({
      fileInputProps: {
        htmlAttributes: {
          name: "avatar",
        },
        events: {
          change: [onchangeCallback],
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
