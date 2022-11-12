import { ChatsAPI } from "api";

export class ChatsServiceClass {
  async getChats(afterRequestCallback: (response: any) => void = () => {}) {
    const request = await ChatsAPI.getChats();
    const { status, response } = request;

    console.log(
      `GET CHATS REQUEST:\nstatus ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    await afterRequestCallback(response);

    return response;
  }
}

export const ChatsService = new ChatsServiceClass();
