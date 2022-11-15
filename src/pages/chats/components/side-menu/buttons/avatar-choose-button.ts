import { WithStoreFileInput } from "hocs/components";

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
      },
      chooseButtonProps: {
        label: "choose avatar",
      },
      props: {
        htmlClasses: ["choose-avatar"],
      },
      helpers: {
        afterRenderHook,
      },
    });
  }
}
