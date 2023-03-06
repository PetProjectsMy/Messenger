import { type Store as TStore } from "core/store";
import { type EnumAppPages } from "pages/enum-app-pages";

declare global {
  export namespace StoreTypings {
    export type Store = TStore;

    export type UserData = {
      id: number;
      firstName: string;
      secondName: string;
      displayName: string;
      login: string;
      email: string;
      phone: string;
      avatar: Nullable<string>; // path to avatar
    };

    export type AppState = {
      page: Nullable<EnumAppPages>;
      user: Nullable<StoreTypings.UserData>;
      chats: Nullable<TAppChatsData>;
      chatsUsers: Nullable<Record<string, TAppChatUsersData>>;
      chatsSockets: TAppChatsSockets;
      chatsMessages: Nullable<TAppChatMessages>;
      currentChatID: Nullable<number>;
    };
  }
}
