import request from "./http-trasnport";

class ChatsAPIClass {
  getChats() {
    return request.get("chats");
  }

  createChat(data: TCreateChatDTO) {
    return request.post("chats", { data });
  }

  deleteChat(data: TDeleteChatDTO) {
    return request.delete("chats", { data });
  }

  getChatUsers(chatID: string) {
    return request.get(`chats/${chatID}/users`);
  }

  getChatToken(chatID: string) {
    return request.post(`chats/token/${chatID}`);
  }

  addUsersToChat(data: TAddChatUsersDTO) {
    return request.put("chats/users", { data });
  }

  changeAvatar(data: FormData) {
    return request.put("chats/avatar", {
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
  }
}

export const ChatsAPI = new ChatsAPIClass();
