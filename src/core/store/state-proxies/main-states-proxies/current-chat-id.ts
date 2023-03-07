import { type Button } from "components/buttons";
import { type AttachmentButton } from "pages/chats/components/chat-section/message-input-section/attachment-button";
import { type MessageInput } from "pages/chats/components/chat-section/message-input-section/message-input";
import { type SendMessageButton } from "pages/chats/components/chat-section/message-input-section/send-message-button";
import { type MessagesDisplayArea } from "pages/chats/components/chat-section/messages-display-section";
import { type AddChatUsersButton } from "pages/chats/components/side-menu/buttons";
import { EnumAppPages } from "pages/enum-app-pages";
import { isNullish } from "utils/objects-handle";

export function currentChatSetter(
  this: StoreTypings.Store,
  oldValue: Nullable<number>,
  newValue: Nullable<number>
) {
  const newValueIsNull = isNullish(newValue);

  if (newValueIsNull) {
    localStorage.removeItem("currentChatID");
  } else {
    localStorage.currentChatID = newValue;
  }
  if (this.getCurrentPageType() !== EnumAppPages.Chats) {
    return;
  }

  console.log("CHANGE CHAT");

  const refs = this.getCurrentPageRefs();
  (refs.messagesDisplaySection as MessagesDisplayArea).createMessagesList();
  (refs.messagesDisplaySection as MessagesDisplayArea).setChatAbsenceWarning();
  (refs.addChatUsersButton as AddChatUsersButton).toggleDisabledState(
    newValueIsNull
  );
  (refs.addChatUsersButton as AddChatUsersButton).toggleDisabledState(
    newValueIsNull
  );
  (refs.attachmentButton as AttachmentButton).assignCurrentChat();
  (refs.messageInput as MessageInput).assignCurrentChat();
  (refs.sendMessageButton as SendMessageButton).assignCurrentChat();
  (refs.chooseChatAvatarButton as Button).toggleDisabledState(newValueIsNull);
  (refs.deleteChatButton as Button).toggleDisabledState(newValueIsNull);

  if (!isNullish(oldValue)) {
    refs[`chat-${oldValue}`].toggleHtmlClass("current-chat", "off");
  }
  if (!isNullish(newValue)) {
    refs[`chat-${newValue}`].toggleHtmlClass("current-chat", "on");
  }
}
