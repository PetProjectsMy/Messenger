import * as PagesClasses from "pages";

declare global {
  export type TAppPage =
    | PagesClasses.ChatsPage
    | PagesClasses.LoginPage
    | PagesClasses.ProfilePage
    | PagesClasses.SignUpPage
    | PagesClasses.Error404Page;

  export type TAppPageClass =
    | typeof PagesClasses.ChatsPage
    | typeof PagesClasses.LoginPage
    | typeof PagesClasses.ProfilePage
    | typeof PagesClasses.SignUpPage
    | typeof PagesClasses.Error404Page;
}

export {};
