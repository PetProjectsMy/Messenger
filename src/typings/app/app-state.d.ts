import { EnumAppPages } from "pages";
import { type Store } from "core/store";
import { type ChatWebSocket } from "services/sockets/socket-class";
import { PathRouter } from "core/router/path-router";

declare global {
  interface Window {
    store: Store;
    router: PathRouter;
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

  type TAppChatUserData = {
    displayName: string;
  };

  export type TAppChatUsersData = Record<string, TAppChatUserData>;

  export type TAppChatsSockets = Nullable<Record<string, ChatWebSocket>>;

  export type TAppState = {
    page: Nullable<EnumAppPages>;
    user: Nullable<TAppUserData>;
    chats: Nullable<TAppChatsData>;
    chatsUsers: Nullable<Record<string, TAppChatUsersData>>;
    chatsSockets: TAppChatsSockets;
    currentChatID: Nullable<number>;
  };
}

export {};
