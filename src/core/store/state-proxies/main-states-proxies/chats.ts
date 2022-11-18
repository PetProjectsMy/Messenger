import { EnumAppPages } from "pages";

export function chatsSetter() {
  const { page } = this.state;

  if (page !== EnumAppPages.Chats) {
    return;
  }

  const { chatsList } = this.page.refs;
  chatsList.createChatsList();
  Object.values(chatsList.children.chats).forEach((chat: any) => {
    this.page.refs[`chat-${chat.chatID}`] = chat;
  });
}
