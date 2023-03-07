export function transformSignUpFormDataToAPI(
  data: TSignupFormData
): TSignUpFormDTO {
  return {
    first_name: data.first_name,
    second_name: data.second_name,
    login: data.login,
    email: data.email,
    password: data.password,
    phone: data.phone,
  };
}

export function transformLoginFormDataToAPI(
  data: TLoginFormData
): TLoginFormDTO {
  return {
    login: data.login,
    password: data.password,
  };
}

export function transformProfileFormDataToAPI(
  data: TProfileFormData
): TProfileChangeDTO {
  return {
    first_name: data.first_name,
    second_name: data.second_name,
    display_name: data.display_name,
    login: data.login,
    email: data.email,
    phone: data.phone,
  };
}

export function transformAddUsersFormDataToAPI(
  data: TAddChatUsersFormData
): TAddChatUsersDTO {
  return {
    chatId: parseInt(data.chatID, 10),
    users: data.usersList.map((userID) => parseInt(userID, 10)),
  };
}

export function transformChatIDToDeleteAPI(chatID: string) {
  return { chatId: parseInt(chatID, 10) };
}
