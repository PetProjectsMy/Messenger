import { Block } from "core/dom";
import { ChatsService } from "services/chats";
import {
  APIResponseHasError,
  transformChatsGetResponseToChatsData,
} from "utils/api";
import { WithStore } from "components/hocs";
import template from "./template";
import { ChatsPageMainSection, ChatsPageNavigationSection } from "./components";

export class ChatsPage extends WithStore(Block) {
  constructor() {
    super({ props: { componentName: "Chats Page" } });
  }

  protected async _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this._getChats();
    this._createChildren();
  }

  private _createChildren() {
    this.children.navigationSection = new ChatsPageNavigationSection();
    this.children.chatSection = new ChatsPageMainSection();
  }

  private async _getChats() {
    const response = await ChatsService.getChats();

    if (APIResponseHasError(response)) {
      throw new Error(
        `CHATS PAGE ERROR: get chats request: ${response.reason}`
      );
    }

    const chatsData = transformChatsGetResponseToChatsData(response);
    this.store.dispatch({ chats: chatsData });
  }

  protected render(): string {
    return template;
  }
}
