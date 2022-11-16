import { Button } from "components";
import {
  ModalWindow,
  AddChatModalWindow,
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
              if (contentType !== EnumModalWindows.AddChat) {
                ModalWindow.dispatchContent(new AddChatModalWindow());
                console.log(`MODAL CONTENT: ${contentType}`);
              }
              ModalWindow.toggleVisibility("on");
            },
          ],
        },
      },
    });
  }
}
