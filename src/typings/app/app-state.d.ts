import { EnumAppPages } from "utils/pages";
import { Store } from "core/store";
import { CoreRouter, EnumAppRoutes } from "core/router";

declare global {
  interface Window {
    store: Store;
    router: CoreRouter<EnumAppRoutes>;
  }

  export type TAppStateUserData = {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    avatar: string; // path to avatar
  };

  export type TAppState = {
    appIsInited: boolean;
    page: EnumAppPages | null;
    user: TAppStateUserData | null;
  };
}

export {};
