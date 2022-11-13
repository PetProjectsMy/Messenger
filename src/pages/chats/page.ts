import { Block } from "core/dom";
import { ChatsService } from "services/chats";
import {
  APIResponseHasError,
  transformChatsGetResponseToChatsData,
} from "utils/api";
import { WithStore } from "components/hocs";
import template from "./template";
import {
  ChatsPageMainSection,
  ChatsPageNavigationSection,
  ChatsPageSideMenu,
} from "./components";

export class ChatsPage extends WithStore(Block) {
  constructor() {
    const children = {} as TComponentChildren;
    children.navigationSection = new ChatsPageNavigationSection();
    children.chatSection = new ChatsPageMainSection();
    children.sideMenu = new ChatsPageSideMenu();

    super({
      props: { componentName: "Chats Page" },
      children,
    });
  }

  protected async _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this.children.chatSection.children.headerSection.children.functionalButton.refs.sideMenu =
      this.children.sideMenu;

    // this._getChats();
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
