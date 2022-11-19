import { ChatsService } from "services/chats";
import { ProfileService } from "services/profile";
import { SocketsCreator } from "services/sockets";
import { getAllChatsAllMessages } from "./get-chats-messages";

export async function initAppData(userID: number) {
  await ProfileService.getUserProfile(userID);
  await ChatsService.getChats();

  const { currentChatID } = localStorage;
  window.store.dispatch({ currentChatID });

  await SocketsCreator.createAllChatsSockets();
  getAllChatsAllMessages();
}
