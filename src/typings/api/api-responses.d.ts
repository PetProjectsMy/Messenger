declare global {
  export type TAPIError = {
    reason: string;
  };

  export type TUserGetAPIResponse = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    email: string;
    avatar: string;
  };

  export type TProfileChangeAPIResponse = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    email: string;
    avatar: string;
    status: null;
  };

  export type TChatAPIObject = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
      user: Omit<TUserGetAPIResponse, "display_name">;
      time: string;
      content: string;
    };
  };

  export type TChatsGetAPIResponse = TChatAPIObject[];
}

export {};
