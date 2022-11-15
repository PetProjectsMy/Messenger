import { EnumAppPages } from "pages";

export function currentChatSetter(oldValue: number, newValue: number) {
  const { page } = this.state;
  const pageObject = this.page;

  if (page !== EnumAppPages.Chats) {
    return;
  }
  if (!newValue) {
    throw new Error("Current Chat ID Can't Be Nullified On Profile Page");
  }

  if (oldValue !== newValue) {
    const title = this.getChatsDataByPath(`${newValue}.title`);
    pageObject.refs.chatTitle.titleDidUpdate(title);
  }

  localStorage.currentChatID = newValue;
}
