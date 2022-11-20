import { WithStoreBlock } from "hocs/components";
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

    const functionalButton = this.getChildByPath(
      "chatSection.headerSection.functionalButton"
    );
    functionalButton.refs.sideMenu = this.getChildByPath("sideMenu");

    this.refs.messagesDisplaySection = this.getChildByPath(
      "chatSection.messagesDisplaySection"
    );

    this.refs.attachmentButton = this.getChildByPath(
      "chatSection.messageInputSection.attachmentButton"
    );

    this.refs.messageInput = this.getChildByPath(
      "chatSection.messageInputSection.messageInput"
    );

    this.refs.sendMessageButton = this.getChildByPath(
      "chatSection.messageInputSection.sendMessageButton"
    );

    this.refs.chooseChatAvatarButton = this.getChildByPath(
      "sideMenu.avatarChooseButton.chooseButton"
    );

    this.refs.addChatUsersButton = this.getChildByPath(
      "sideMenu.addChatUsersButton"
    );

    this.refs.deleteChatButton = this.getChildByPath(
      "sideMenu.deleteChatButton"
    );

    const chatsList = this.getChildByPath("navigationSection.chatsList");
    this.refs.chatsList = chatsList;

    const chats = chatsList.getChildByPath<TComponentChildArray>("chats");
    chats.forEach((chat: any) => {
      this.refs[`chat-${chat.chatID}`] = chat;
    });
  }

  protected render(): string {
    return template;
  }
}
