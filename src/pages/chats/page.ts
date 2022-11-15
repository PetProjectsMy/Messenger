import { WithStoreBlock } from "components/hocs";
import { getDescendantByPath } from "utils/pages";
import template from "./template";
import {
  ChatsPageMainSection,
  ChatsPageNavigationSection,
  ChatsPageSideMenu,
  ModalWindow,
} from "./components";

export class ChatsPage extends WithStoreBlock {
  constructor() {
    const children = {} as TComponentChildren;
    children.navigationSection = new ChatsPageNavigationSection();
    children.chatSection = new ChatsPageMainSection();
    children.sideMenu = new ChatsPageSideMenu();
    children.addChatModal = new ModalWindow();
    super({
      props: { componentName: "Chats Page" },
      children,
    });
  }

  protected async _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    const functionalButton = getDescendantByPath(this, [
      "chatSection",
      "headerSection",
      "functionalButton",
    ]);
    functionalButton.refs.sideMenu = this.children.sideMenu;

    const createChatButton = getDescendantByPath(this, [
      "sideMenu",
      "createChatButton",
    ]);
    createChatButton.refs.addChatModal = this.children.addChatModal;

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
    ]);
  }

  protected render(): string {
    return template;
  }
}
