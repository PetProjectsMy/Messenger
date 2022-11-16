import { EnumAppPages } from "pages";
import { Store } from "core/store";
import { CoreRouter, EnumAppRoutes } from "core/router";

declare global {
  interface Window {
    store: Store;
    router: CoreRouter<EnumAppRoutes>;
  }

  export type TAppUserData = {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    avatar: Nullable<string>; // path to avatar
  };

  type TChatData = {
    title: string;
    avatar: Nullable<string>;
    lastMessage: {
      content: string;
    };
  };

  export type TAppChatsData = Record<string, TChatData>;

  export type TAppState = {
    appIsInited: boolean;
    page: Nullable<EnumAppPages>;
    user: Nullable<TAppUserData>;
    chats: Nullable<TAppChatsData>;
    currentChatID: Nullable<number>;
  };
}

export {};
