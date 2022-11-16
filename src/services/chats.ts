import { ChatsAPI } from "api";
import { type Block } from "core/dom";
import {
  APIResponseHasError,
  transformAvatarURL,
  transformChatsGetResponseToChatsData,
} from "utils/api";

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

  async changeAvatar({
    chatID,
    avatarForm,
    afterRequestCallback,
  }: {
    chatID: string;
    avatarForm: FormData;
    afterRequestCallback?: TAfterRequestCallback;
  }) {
    avatarForm.append("chatId", chatID);

    const request = await ChatsAPI.changeAvatar(avatarForm);
    const { status, response } = request;

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
          (chatComponent.children.avatarImage as Block).setPropByPath(
            "htmlAttributes.src",
            avatar
          );
        },
      });
    }

    return response;
  }
}

export const ChatsService = new ChatsServiceClass();
