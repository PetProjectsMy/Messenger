import { EnumAppPages } from "pages";
import { isNullish } from "utils/objects-handle";

export function currentChatSetter(
  oldValue: Nullable<number>,
  newValue: Nullable<number>
) {
  const { page } = this.state;
  const newValueIsNull = isNullish(newValue);

  if (newValueIsNull) {
    localStorage.removeItem("currentChatID");
  } else {
    localStorage.currentChatID = newValue;
  }

  if (oldValue === newValue || page !== EnumAppPages.Chats) {
    return;
  }

  const { refs } = this.page;
  refs.chatTitle.setCurrentChatTitle();
  refs.messagesSection.setChatAbsenceWarning();
  refs.attachmentButton.toggleDisabledState(newValueIsNull);
  refs.messageInput.toggleDisabledState(newValueIsNull);
  refs.sendMessageButton.toggleDisabledState(newValueIsNull);
  refs.chooseChatAvatarButton.toggleDisabledState(newValueIsNull);
}
