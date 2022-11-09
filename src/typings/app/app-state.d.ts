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
    user: TAPIUserResponse | null;
  };

  export type TAPIUserResponse = {
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
