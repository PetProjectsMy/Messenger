import { type ChatsList } from "pages/chats/components/navigation/chats-list";
import { EnumAppPages } from "pages/enum-app-pages";

export function chatsSetter(this: StoreTypings.Store) {
  if (this.getCurrentPageType() !== EnumAppPages.Chats) {
    return;
  }

  const refs = this.getCurrentPageRefs();
  const chatsList = refs.chatsList as ChatsList;
  chatsList.createChatsList();
  Object.values(chatsList.children.chats).forEach((chat: any) => {
    refs[`chat-${chat.chatID}`] = chat;
  });
}
