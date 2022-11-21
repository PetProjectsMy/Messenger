import { EnumAppPages } from "pages/enum-app-pages";

export function ChatAvatar(chatID: string | number, newAvatar: string) {
  const pageType = this.state.page;
  if (pageType !== EnumAppPages.Chats) {
    return;
  }

  const { page } = this;
  const chatComponent = page.refs[`chat-${chatID}`];
  const { avatarImage } = chatComponent.children;
  avatarImage.setPropByPath("htmlAttributes.src", newAvatar);
}

export function ChatNewMessage(chatID: string) {
  const pageType = this.state.page;
  if (pageType !== EnumAppPages.Chats) {
    return;
  }

  const { page } = this;
  if (chatID === window.store.getCurrentChatID())
    page.refs.messagesDisplaySection.createMessagesList();
  page.refs.messagesDisplaySection.setChatAbsenceWarning();
}
