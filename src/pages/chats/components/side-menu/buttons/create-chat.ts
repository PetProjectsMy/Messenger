import { Button } from "components/buttons";
import {
  ModalWindow,
  CreateChatModalWindow,
  EnumModalWindows,
} from "pages/chats/components/modals";

export class CreateChatButton extends Button {
  constructor() {
    super({
      props: {
        label: "create new chat",
        events: {
          click: [
            function () {
              const contentType = ModalWindow.getContentType();
              const componentName = EnumModalWindows.CreateChat;

              if (contentType !== componentName) {
                ModalWindow.setContent(
                  new CreateChatModalWindow(componentName)
                );
              }

              ModalWindow.toggleVisibility("on");
            },
          ],
        },
      },
    });
  }
}
