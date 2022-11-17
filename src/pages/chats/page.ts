import { type Block } from "core/dom";
import { WithStoreBlock } from "hocs/components";
import { getDescendantByPath } from "utils/pages";
import { isNullish } from "utils/objects-handle";
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
      componentName: "Chats Page",
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
    functionalButton.refs.sideMenu = getDescendantByPath(this, ["sideMenu"]);

    this.refs.chatSection = this.children.chatSection as Block;

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

    this.refs.addChatUsersButton = getDescendantByPath(this, [
      "sideMenu",
      "addChatUsersButton",
    ]);

    this.refs.deleteChatButton = getDescendantByPath(this, [
      "sideMenu",
      "deleteChatButton",
    ]);

    const chatsList = getDescendantByPath(this, [
      "navigationSection",
      "chatsList",
    ]);
    this.refs.chatsList = chatsList;

    const chats = getDescendantByPath<Block[]>(chatsList, ["chats"]);
    chats.forEach((chat: any) => {
      this.refs[`chat-${chat.chatID}`] = chat;
    });

    const currentChatID = this.store.getCurrentChatID();
    if (!isNullish(currentChatID)) {
      this.refs[`chat-${currentChatID}`].toggleHtmlClass("current-chat", "on");
    }
  }

  protected render(): string {
    return template;
  }
}
