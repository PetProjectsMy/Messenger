import { transformChatGetTokenResponseToToken } from "utils/api/from-api-data-transformers";
import { ChatsAPI } from "api";
import { ChatMessagesHandler } from "./chat-messages-handler";

export class SocketsCreatorClass {
  async getChatToken(
    chatID: string,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    const request = await ChatsAPI.getChatToken(chatID);
    const { status, response } = request;

    console.log(
      `GET CHAT(${chatID}) TOKEN REQUEST: status ${status}; response ${JSON.stringify(
        response
      )}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }

    return response;
  }

  async createChatSocket({
    userID,
    chatID,
  }: {
    userID?: string;
    chatID: string;
  }) {
    if (!userID) {
      userID = window.store.getUserID() as string;
    }

    const chatTokenResponse = await this.getChatToken(chatID);
    const chatToken = transformChatGetTokenResponseToToken(chatTokenResponse);
    return new ChatMessagesHandler({ userID, chatID, chatToken });
  }

  async createAllChatsSockets() {
    const { store } = window;
    const userID = store.getUserID();

    const chatsSockets = (
      await Promise.all(
        Object.keys(store.getChatsDataByPath()).map(async (chatID) => {
          return [chatID, await this.createChatSocket({ userID, chatID })];
        })
      )
    ).reduce((acc, [chatID, socket]: [string, ChatMessagesHandler]) => {
      acc![chatID] = socket;
      return acc;
    }, {} as TAppChatsSockets);

    await Promise.all(
      Object.values(chatsSockets!).map(async (socket) =>
        socket.waitSocketConnection()
      )
    );

    window.store.dispatch({ chatsSockets });
  }
}

export const SocketsCreator = new SocketsCreatorClass();
