import * as PagesClasses from "pages";
import * as Components from "components";
import { Pages as PagesList } from "pages/pages-list";
import { Block } from "core/dom";

declare global {
  export type BlockClass<
    P extends ComponentCommonProps,
    S extends ComponentState
  > = typeof Block<P, S>;

  export type PageComponent =
    | Components.Button
    | Components.ImageElement
    | Components.Input
    | Components.Link
    | Components.TextElement;

  export type PageComponentClass =
    | typeof Components.Button
    | typeof Components.ImageElement
    | typeof Components.Input
    | typeof Components.Link
    | typeof Components.TextElement;

  export type AppPage =
    | PagesClasses.ChatsPage
    | PagesClasses.LoginPage
    | PagesClasses.ProfilePage
    | PagesClasses.SignUpPage
    | PagesClasses.Error404Page;

  export type AppPageClass =
    | typeof PagesClasses.ChatsPage
    | typeof PagesClasses.LoginPage
    | typeof PagesClasses.ProfilePage
    | typeof PagesClasses.SignUpPage
    | typeof PagesClasses.Error404Page;

  export type AppState = {
    appIsInited: boolean;
    page: PagesList | null;
    isLoading: boolean;
    loginFormError: string | null;
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
