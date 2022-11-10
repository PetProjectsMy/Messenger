declare global {
  export type TAPIError = {
    reason: string;
  };

  export type TUserAPIResponse = {
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
  };
}

export {};
