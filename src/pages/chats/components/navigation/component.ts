import { type Block } from "core/dom";
import { WithStoreBlock } from "components/hocs";
import { ChatsService } from "services";
import { NavigationSectionChatComponent } from "./chat-component";
import { HeaderSection } from "./header-section";
import template from "./template";

export class ChatsPageNavigationSection extends WithStoreBlock {
  constructor() {
    const children = {} as TComponentChildren;

    children.headerSection = new HeaderSection();

    super({ children });
  }

  protected render() {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this._createChatsList();
  }

  private _createChatsList() {
    const chats = this.store.getChatsDataByPath();
    // const chats = this.store.getChats();

    const chatsList = [] as Block[];
    Object.entries(chats!).forEach(([id, chatData]) => {
      chatsList.push(new NavigationSectionChatComponent(id));
    });
    this.children.chatsList = chatsList;
  }
}
