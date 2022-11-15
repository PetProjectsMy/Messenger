import { Block } from "core/dom";
import { WithStore } from "components/hocs";
import { ChatsService } from "services";
import { NavigationSectionChatComponent } from "./chat-component";
import { HeaderSection } from "./header-section";
import template from "./template";

export class ChatsPageNavigationSection extends WithStore(Block) {
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
      console.log(`CHAT (${id}): ${JSON.stringify(chatData)}`);
      chatsList.push(new NavigationSectionChatComponent(id));
    });
    this.children.chatsList = chatsList;
  }
}
