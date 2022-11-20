declare global {
  export type TSignUpFormDTO = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  };

  export type TLoginFormDTO = {
    login: string;
    password: string;
  };

  export type TProfileChangeDTO = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
  };

  export type TCreateChatDTO = {
    title: string;
  };

  export type TDeleteChatDTO = {
    chatId: number;
  };

  export type TAddChatUsersDTO = {
    chatId: number;
    users: number[];
  };
}

export {};
