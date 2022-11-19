import { ChatWebSocket } from "services/sockets/socket-class";

export function getAllChatsAllMessages() {
  const { chatsSockets } = window.store.state;
  const batchSize = ChatWebSocket.messagesGetLimit;

  for (const [chatID, socket] of Object.entries(chatsSockets!)) {
    for (let i = 0; i < 2; ++i) {
      socket.getMessages(i * batchSize);
    }
  }
}
