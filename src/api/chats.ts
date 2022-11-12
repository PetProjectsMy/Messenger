import request from "./http-trasnport";

class ChatsAPIClass {
  getChats() {
    return request.get("chats");
  }
}

export const ChatsAPI = new ChatsAPIClass();
