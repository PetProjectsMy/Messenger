import { baseURL } from "api";

export function transformProfileAPIResponseToUserData(
  data: TProfileAPIResponse
): TAppUserData {
  const avatar = data.avatar
    ? `${baseURL}/resources${data.avatar}`
    : data.avatar;

  return {
    id: data.id,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    login: data.login,
    email: data.email,
    phone: data.phone,
    avatar,
  };
}

export function transformChatsGetResponseToChatsData(
  data: TChatsGetAPIResponse
): TAppChatsData {
  return data.reduce((acc, chatData) => {
    const { id, title, avatar, last_message } = chatData;
    acc[id] = {
      title,
      avatar,
      lastMessage: { content: last_message.content },
    };

    return acc;
  }, {} as TAppChatsData);
}
