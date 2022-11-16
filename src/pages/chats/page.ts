import { WithStoreBlock } from "hocs/components";
import { getDescendantByPath } from "utils/pages";
import { ModalWindow } from "./components/modals";
import template from "./template";
import {
  ChatsPageMainSection,
  ChatsPageNavigationSection,
  ChatsPageSideMenu,
} from "./components";

export class ChatsPage extends WithStoreBlock {
  constructor() {
    const children = {} as TComponentChildren;
    children.navigationSection = new ChatsPageNavigationSection();
    children.chatSection = new ChatsPageMainSection();
    children.sideMenu = new ChatsPageSideMenu();
    children.modalWindow = ModalWindow;

    super({
      props: { componentName: "Chats Page" },
      children,
    });
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    const functionalButton = getDescendantByPath(this, [
      "chatSection",
      "headerSection",
      "functionalButton",
    ]);
    functionalButton.refs.sideMenu = this.children.sideMenu;

    this.refs.chatTitle = getDescendantByPath(this, [
      "chatSection",
      "headerSection",
      "chatTitle",
    ]);

    this.refs.messagesSection = getDescendantByPath(this, [
      "chatSection",
      "messagesDisplaySection",
    ]);

    this.refs.attachmentButton = getDescendantByPath(this, [
      "chatSection",
      "messageInputSection",
      "attachmentButton",
    ]);

    this.refs.messageInput = getDescendantByPath(this, [
      "chatSection",
      "messageInputSection",
      "messageInput",
    ]);

    this.refs.sendMessageButton = getDescendantByPath(this, [
      "chatSection",
      "messageInputSection",
      "sendMessageButton",
    ]);

    this.refs.chooseChatAvatarButton = getDescendantByPath(this, [
      "sideMenu",
      "avatarChooseButton",
      "chooseButton",
    ]);

    const chatsList = getDescendantByPath(this, [
      "navigationSection",
      "chatsList",
    ]);
    this.refs.chatsList = chatsList;

    const chats = getDescendantByPath(chatsList, ["chats"]);
    chats.forEach((chat: any) => {
      console.log(`CHAT REF: chat-${chat.chatID}`);
      this.refs[`chat-${chat.chatID}`] = chat;
    });
  }

  protected render(): string {
    return template;
  }
}
