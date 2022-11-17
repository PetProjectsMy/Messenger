import { ChatsAPI } from "api";
import { type ImageComponent } from "components";
import {
  APIResponseHasError,
  transformAvatarURL,
  transformChatsGetResponseToChatsData,
} from "utils/api";
import {
  transformChatGetTokenResponseToToken,
  transformChatUsersGetResponseToChatsUsersData,
} from "utils/api/from-api-data-transformers";
import { transformChatIDToDeleteAPI } from "utils/api/to-api-data-transformers";
import { objectWithoutKey } from "utils/objects-handle";
import { getDescendantByPath } from "utils/pages";
import { ChatWebSocket } from "./socket";

export class ChatsServiceClass {
  async getChats(afterRequestCallback: TAfterRequestCallback = () => {}) {
    const request = await ChatsAPI.getChats();
    const { status, response } = request;

    console.log(
      `GET CHATS REQUEST: status ${status}; response ${JSON.stringify(
        response
      )}`
    );

    if (!APIResponseHasError(response)) {
      window.store.dispatch({
        chats: transformChatsGetResponseToChatsData(response),
      });
    }

    await afterRequestCallback(response);

    return response;
  }

  async createChat(
    data: TCreateChatDTO,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    const request = await ChatsAPI.createChat(data);
    const { status, response } = request;

    console.log(
      `CREATE CHAT REQUEST: status ${status}; response ${JSON.stringify(
        response
      )}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }

    if (!APIResponseHasError(response)) {
      await this.getChats();
    }

    return response;
  }

  async deleteChat(
    chatID: string,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    const request = await ChatsAPI.deleteChat(
      transformChatIDToDeleteAPI(chatID)
    );
    const { status, response } = request;

    console.log(
      `DELETE CHAT(${chatID}) REQUEST: status ${status}; response ${JSON.stringify(
        response
      )}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }

    if (!APIResponseHasError(response)) {
      const currentChats = window.store.getChatsDataByPath();
      const newChats = objectWithoutKey(currentChats, chatID) as TAppChatsData;
      window.store.dispatch({ chats: newChats });
      window.store.dispatch({ currentChatID: null });
    }

    return response;
  }

  async getChatUsers(
    chatID: string,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    const request = await ChatsAPI.getChatUsers(chatID);
    const { status, response } = request;

    console.log(
      `GET CHAT(${chatID}) USERS REQUEST: status ${status}; response ${JSON.stringify(
        response
      )}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }

    return response;
  }

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

  async createChatsSockets() {
    const { store } = window;
    const userID = store.getUserID();

    const chatsSockets = (
      await Promise.all(
        Object.keys(store.getChatsDataByPath()).map(async (chatID) => {
          const chatTokenResponse = await this.getChatToken(chatID);
          const chatToken =
            transformChatGetTokenResponseToToken(chatTokenResponse);
          return [chatID, new ChatWebSocket({ userID, chatID, chatToken })];
        })
      )
    ).reduce((acc, [chatID, socket]: [string, ChatWebSocket]) => {
      acc![chatID] = socket;
      return acc;
    }, {} as TAppChatsSockets);

    console.log(`SOCKETS: ${JSON.stringify(chatsSockets)}`);
    window.store.dispatch({ chatsSockets });
  }

  async addUsersToChat(
    data: TAddChatUsersDTO,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    const request = await ChatsAPI.addUsersToChat(data);
    const { status, response } = request;
    const chatID = data.chatId;
    const usersList = data.users;

    console.log(
      `ADD USERS TO CHAT(${chatID}) REQUEST: status ${status}; response ${JSON.stringify(
        response
      )}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }

    if (!APIResponseHasError(response)) {
      const responseChatUsers = (await this.getChatUsers(
        chatID.toString()
      )) as TChatGetUsersAPIResponse;

      const usersData =
        transformChatUsersGetResponseToChatsUsersData(responseChatUsers);

      usersList.forEach((userID) => {
        window.store.setStateByPath({
          pathString: `chatsUsers.${userID}`,
          value: usersData[userID],
        });
      });
    }

    return response;
  }

  async changeAvatar(
    avatarPutForm: FormData,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    const request = await ChatsAPI.changeAvatar(avatarPutForm);
    const { status, response } = request;
    const chatID = avatarPutForm.get("chatId");

    console.log(
      `CHANGE CHAT(${chatID}) AVATAR REQUEST: status ${status}; response ${JSON.stringify(
        response
      )}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }

    if (!APIResponseHasError(response)) {
      const avatar = transformAvatarURL(response.avatar);
      window.store.setStateByPath({
        pathString: `chats.${chatID}.avatar`,
        value: avatar,
        afterSetCallback() {
          const chatComponent = window.store.getPageRef(`chat-${chatID}`);
          const avatarImage = getDescendantByPath(chatComponent, [
            "avatarImage",
          ]) as ImageComponent;
          avatarImage.setPropByPath("htmlAttributes.src", avatar);
        },
      });
    }

    return response;
  }
}

export const ChatsService = new ChatsServiceClass();
