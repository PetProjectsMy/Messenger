import { EnumAppPages } from "pages";

export function chatsSetter(oldValue: any, newValue: any) {
  const { page } = this.state;

  if (page !== EnumAppPages.Chats) {
    return;
  }

  const { chatsList } = this.page.refs;
  chatsList._createChatsList();
  chatsList._componentDidUpdate("", "", true);
}
