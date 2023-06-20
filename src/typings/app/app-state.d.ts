import { type PathRouter } from "core/router/path-router";
import { type ChatMessagesHandler } from "services/sockets";

declare global {
  interface Window {
    store: StoreTypings.Store;
    router: PathRouter;
  }

  type TChatData = {
    title: string;
    avatar: Nullable<string>;
    unreadCount: number;
    lastMessage: {
      content: string;
    };
  };

  export type TAppChatsData = Record<string, TChatData>;

  type TAppChatUserData = {
    displayName: string;
  };

  export type TAppChatUsersData = Record<string, TAppChatUserData>;

  export type TAppChatsSockets = Nullable<Record<string, ChatMessagesHandler>>;

  export type TAppChatMessage = {
    content: string;
    userID: string;
    time: string;
  };

  export type TAppChatMessages = Record<string, TAppChatMessage[]>;
}

export {};
