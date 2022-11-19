/* eslint-disable @typescript-eslint/naming-convention */
import { baseURL } from "api";

export function transformAvatarURL(url: Nullable<string>) {
  return url ? `${baseURL}/resources${url}` : url;
}

export function transformProfileAPIResponseToUserData(
  response: TProfileAPIResponse
): TAppUserData {
  return {
    id: response.id,
    firstName: response.first_name,
    secondName: response.second_name,
    displayName: response.display_name ? response.display_name : "",
    login: response.login,
    email: response.email,
    phone: response.phone,
    avatar: transformAvatarURL(response.avatar),
  };
}

export function transformChatsGetResponseToChatsData(
  response: TChatsGetAPIResponse
): TAppChatsData {
  return response.reduce((acc, chatData) => {
    const { id, title, avatar, last_message, unread_count } = chatData;

    acc[id] = {
      title,
      unreadCount: unread_count,
      avatar: transformAvatarURL(avatar),
      lastMessage: last_message,
    };

    return acc;
  }, {} as TAppChatsData);
}

export function transformChatUsersGetResponseToChatsUsersData(
  response: TChatGetUsersAPIResponse
): TAppChatUsersData {
  return response.reduce((acc, userData) => {
    acc[userData.id.toString()] = {
      displayName: userData.display_name,
    };

    return acc;
  }, {} as TAppChatUsersData);
}

export function transformChatGetTokenResponseToToken(
  response: TChatGetTokenResponse
): string {
  return response.token;
}

export function transformWebsocketMessageDTOtoAppMessage(
  message: TWebsocketMessageDTO
): TAppChatMessage {
  return {
    userID: message.user_id.toString(),
    content: message.content,
    time: message.time,
  };
}
