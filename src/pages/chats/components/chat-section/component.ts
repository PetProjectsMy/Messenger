import { Block } from "core/dom";
import { ChatSectionHeader } from "./header";
import { MessagesDisplayArea } from "./messages-display-area";
import template from "./template";

export class ChatsPageMainSection extends Block {
  constructor() {
    const children: TComponentChildren = {};

    children.headerSection = new ChatSectionHeader();
    children.messagesDisplayArea = new MessagesDisplayArea();

    super({ children });
  }

  protected render(): string {
    return template;
  }
}
