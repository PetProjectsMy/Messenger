import { EnumAppPages } from "utils/pages";
import { Store } from "core/store";
import { CoreRouter, EnumAppRoutes } from "core/router";

declare global {
  interface Window {
    store: Store<TAppState>;
    router: CoreRouter<EnumAppRoutes>;
  }

  export type TAppState = {
    appIsInited: boolean;
    page: EnumAppPages | null;
    user: User | null;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };
}

export {};
