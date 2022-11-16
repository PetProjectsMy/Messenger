import { WithStoreButton } from "hocs/components";
import { ChatsService } from "services";
import { transformChatIDToDeleteAPI } from "utils/api/to-api-data-transformers";

export class DeleteChatButton extends WithStoreButton {
  constructor() {
    super({
      props: {
        label: "delete chat",
        events: {
          click: [
            function () {
              const currentChatID = this.store.getCurrentChatID();
              console.log(
                `CURRENT CHAT: ${JSON.stringify(
                  transformChatIDToDeleteAPI(currentChatID)
                )}`
              );
              ChatsService.deleteChat(currentChatID);
            },
          ],
        },
      },
    });
  }
}
