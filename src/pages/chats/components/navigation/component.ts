import { Block } from "core/dom";
import { NavigationSectionChatComponent } from "./chat-component";
import { HeaderSection } from "./header-section";
import template from "./template";

export class ChatsPageNavigationSection extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.headerSection = new HeaderSection();

    children.chats = [];
    for (let i = 1; i <= 10; ++i) {
      children.chats.push(new NavigationSectionChatComponent());
    }

    super({ children });
  }

  protected render() {
    return template;
  }
}
