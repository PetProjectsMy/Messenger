import { WithStoreBlock } from "hocs/components";
import { HeaderSection } from "./header-section";
import { ChatsList } from "./chats-list";
import template from "./template";

export class ChatsPageNavigationSection extends WithStoreBlock {
  constructor() {
    const children = {} as TComponentChildren;

    children.headerSection = new HeaderSection();
    children.chatsList = new ChatsList();

    super({ children });
  }

  protected render() {
    return template;
  }
}
