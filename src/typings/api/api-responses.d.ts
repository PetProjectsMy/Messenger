declare global {
  export type TAPIError = {
    reason: string;
  };

  export type TUserAPIObject = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    email: string;
    avatar: string;
  };

  type TUserGetAPIResponse = TUserAPIObject;

  export type TProfileAPIResponse = TUserAPIObject & {
    status: null;
  };

  type TChatAPIObject = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
      user: Omit<TUserAPIObject, "display_name">;
      time: string;
      content: string;
    };
  };

  export type TChatsGetAPIResponse = TChatAPIObject[];

  export type TChatGetUsersAPIResponse = (TUserAPIObject & {
    role: string;
  })[];

  export type TChatCreateAPIResponse = { id: number };

  export type TChatGetTokenResponse = { token: string };
}

export {};
