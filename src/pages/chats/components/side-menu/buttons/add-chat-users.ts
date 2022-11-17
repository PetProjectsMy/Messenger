import { WithStoreButton } from "hocs/components";
import { isNullish } from "utils/objects-handle";
import {
  ModalWindow,
  AddChatUsersModalWindow,
  EnumModalWindows,
} from "pages/chats/components/modals";

export class AddChatUsersButton extends WithStoreButton {
  constructor() {
    super({
      props: {
        label: "add chat users",
        events: {
          click: [
            function () {
              const chatID = this.store.getCurrentChatID();
              const componentName = `${EnumModalWindows.AddUsers}(${chatID})`;
              const contentType = ModalWindow.getContentType();

              if (contentType !== componentName) {
                ModalWindow.dispatchContent(
                  new AddChatUsersModalWindow({ chatID, componentName })
                );
              }

              ModalWindow.toggleVisibility("on");
            },
          ],
        },
      },
    });
  }

  protected _afterRenderHook(): void {
    const currentChatID = this.store!.getCurrentChatID();
    if (isNullish(currentChatID)) {
      this.toggleDisabledState(true);
    }
  }
}
