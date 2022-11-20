import { EnumAppPages } from "pages";
import { isNullish } from "utils/objects-handle";

export function currentChatSetter(
  oldValue: Nullable<number>,
  newValue: Nullable<number>
) {
  const newValueIsNull = isNullish(newValue);
  const { page } = this.state;

  if (newValueIsNull) {
    localStorage.removeItem("currentChatID");
  } else {
    localStorage.currentChatID = newValue;
  }
  if (page !== EnumAppPages.Chats) {
    return;
  }

  const { refs } = this.page;
  refs.messagesDisplaySection.createMessagesList();
  refs.messagesDisplaySection.setChatAbsenceWarning();
  refs.addChatUsersButton.toggleDisabledState(newValueIsNull);
  refs.deleteChatButton.toggleDisabledState(newValueIsNull);
  refs.attachmentButton.assignCurrentChat();
  refs.messageInput.assignCurrentChat();
  refs.sendMessageButton.assignCurrentChat();
  refs.chooseChatAvatarButton.toggleDisabledState(newValueIsNull);

  if (!isNullish(oldValue)) {
    refs[`chat-${oldValue}`].toggleHtmlClass("current-chat", "off");
  }
  if (!isNullish(newValue)) {
    refs[`chat-${newValue}`].toggleHtmlClass("current-chat", "on");
  }
}
