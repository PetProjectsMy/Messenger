declare global {
  export type TAPIError = {
    reason: string;
  };

  export type TUserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type SignUpFormDTO = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  };

  export type LoginFormDTO = {
    login: string;
    password: string;
  };
}

export {};
