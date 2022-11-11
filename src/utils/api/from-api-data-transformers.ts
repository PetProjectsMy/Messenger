export function transformProfileChangeAPIResponseToAppUserData(
  data: TProfileChangeAPIResponse
): TAppStateUserData {
  return {
    id: data.id,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    login: data.login,
    email: data.email,
    phone: data.phone,
    avatar: data.avatar,
  };
}
