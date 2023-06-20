import { type ImageComponent } from "components/image";
import { type MessagesDisplayArea } from "pages/chats/components/chat-section/messages-display-section";
import { EnumAppPages } from "pages/enum-app-pages";

export function setChatAvatar(
  this: StoreTypings.Store,
  chatID: string | number,
  newAvatar: string
) {
  const pageType = this.getCurrentPageType();
  if (pageType !== EnumAppPages.Chats) {
    return;
  }

  const refs = this.getCurrentPageRefs();
  const chatComponent = refs[`chat-${chatID}`];
  const avatarImage = chatComponent.children.avatarImage as ImageComponent;
  avatarImage.setPropByPath({
    pathString: "htmlAttributes.src",
    value: newAvatar,
  });
}

export function setChatNewMessage(this: StoreTypings.Store, chatID: string) {
  const pageType = this.getCurrentPageType();
  if (pageType !== EnumAppPages.Chats) {
    return;
  }

  const refs = this.getCurrentPageRefs();
  if (chatID === window.store.getCurrentChatID())
    (refs.messagesDisplaySection as MessagesDisplayArea).createMessagesList();
  (refs.messagesDisplaySection as MessagesDisplayArea).setChatAbsenceWarning();
}
