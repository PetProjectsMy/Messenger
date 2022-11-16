/* eslint-disable @typescript-eslint/naming-convention */
import { baseURL } from "api";

export function transformAvatarURL(url: Nullable<string>) {
  return url ? `${baseURL}/resources${url}` : url;
}

export function transformProfileAPIResponseToUserData(
  data: TProfileAPIResponse
): TAppUserData {
  return {
    id: data.id,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name ? data.display_name : "",
    login: data.login,
    email: data.email,
    phone: data.phone,
    avatar: transformAvatarURL(data.avatar),
  };
}

export function transformChatsGetResponseToChatsData(
  data: TChatsGetAPIResponse
): TAppChatsData {
  return data.reduce((acc, chatData) => {
    const { id, title, avatar, last_message } = chatData;

    acc[id] = {
      title,
      avatar: transformAvatarURL(avatar),
      lastMessage: last_message,
    };

    return acc;
  }, {} as TAppChatsData);
}
