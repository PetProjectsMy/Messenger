import { ChatsAPI } from "api";
import { APIResponseHasError } from "utils/api";

export class ChatsServiceClass {
  async getChats(afterRequestCallback: TAfterRequestCallback = () => {}) {
    const request = await ChatsAPI.getChats();
    const { status, response } = request;

    console.log(
      `GET CHATS REQUEST:status ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    if (!APIResponseHasError(response)) {
      window.store.dispatch({ chats: response });
    }

    await afterRequestCallback(response);

    return response;
  }

  async createChat(
    data: TCreateChatDTO,
    afterRequestCallback: TAfterRequestCallback = () => {}
  ) {
    const request = await ChatsAPI.createChat(data);
    const { status, response } = request;

    console.log(
      `CREATE CHAT REQUEST: status ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    await afterRequestCallback(response);

    return response;
  }
}

export const ChatsService = new ChatsServiceClass();
