import { EnumAppPages } from "pages";
import { isNullish } from "utils/objects-handle";

export function currentChatSetter(
  oldValue: Nullable<number>,
  newValue: Nullable<number>
) {
  const { page } = this.state;

  if (page === EnumAppPages.Navigation) {
    if (isNullish(newValue)) {
      localStorage.removeItem("currentChatID");
    }

    return;
  }

  if (page !== EnumAppPages.Chats) {
    return;
  }

  if (isNullish(newValue)) {
    throw new Error("Current Chat ID Can't Be Nullified On Chats Page");
  }

  const { refs } = this.page;

  if (oldValue !== newValue) {
    const title = this.getChatsDataByPath(`${newValue}.title`);
    refs.chatTitle.titleDidUpdate(title);
  }
  if (isNullish(oldValue)) {
    refs.messagesSection.removeChatAbsenceWarning();
    refs.attachmentButton.toggleDisabledState(false);
    refs.messageInput.toggleDisabledState(false);
    refs.sendMessageButton.toggleDisabledState(false);
    refs.chooseChatAvatarButton.toggleDisabledState(false);
  }

  localStorage.currentChatID = newValue;
}
