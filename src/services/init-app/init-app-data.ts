import { ChatsService } from "services/chats";
import { ProfileService } from "services/profile";
import { SocketsCreator } from "services/sockets";

async function getAllChatsAllMessages() {
  const chatsSockets = window.store.getSocketByChatID() as TAppChatsSockets;
  const allSockets = Object.values(chatsSockets!);

  const allMessagesByChat = await Promise.all(
    allSockets.map(async (messagesHandler) => {
      const messages = await messagesHandler.getAllMessages();
      const { chatID } = messagesHandler;
      return { chatID, messages };
    })
  );

  const allChatsAllMessages = allMessagesByChat.reduce(
    (acc, { chatID, messages }) => {
      acc[chatID] = messages;
      return acc;
    },
    {} as TAppChatMessages
  );

  window.store.dispatch({ chatsMessages: allChatsAllMessages });
}

export async function initAppData(userID: number) {
  await ProfileService.getUserProfile(userID);
  await ChatsService.getChats();

  const { currentChatID } = localStorage;
  window.store.dispatch({ currentChatID });

  await SocketsCreator.createAllChatsSockets();
  await getAllChatsAllMessages();
}
