import { WithStoreButton } from "hocs/components";
import { isNullish } from "utils/objects-handle";
import backgroundImage from "./icon.png";

export class AttachmentButton extends WithStoreButton {
  constructor() {
    super({
      props: {
        htmlClasses: ["attachment-button"],
        htmlStyle: {
          "background-image": backgroundImage,
        },
      },
    });
  }

  protected _afterRenderHook(): void {
    super._afterRenderHook();

    this.assignCurrentChat();
  }

  public assignCurrentChat() {
    const currentChatID = this.store!.getCurrentChatID();
    this.toggleDisabledState(isNullish(currentChatID));
  }
}
