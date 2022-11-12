import { baseURL } from "api";

export function transformProfileChangeAPIResponseToAppUserData(
  data: TProfileChangeAPIResponse
): TAppStateUserData {
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
