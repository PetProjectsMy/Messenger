import request from "./http-trasnport";

class ChatsAPIClass {
  getChats() {
    return request.get("chats");
  }

  createChat(data: TCreateChatDTO) {
    return request.post("chats", { data });
  }
}

export const ChatsAPI = new ChatsAPIClass();
