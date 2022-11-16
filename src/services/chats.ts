import { ChatsAPI } from "api";
import { type ImageComponent } from "components";
import {
  APIResponseHasError,
  transformAvatarURL,
  transformChatsGetResponseToChatsData,
} from "utils/api";
import { transformChatIDToDeleteAPI } from "utils/api/to-api-data-transformers";
import { objectWithoutKey } from "utils/objects-handle";
import { getDescendantByPath } from "utils/pages";

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
