import { SignUpPage } from "pages/sign-up";
import { LoginPage } from "pages/login";
import { ChatsPage } from "pages/chats";
import { ProfilePage } from "pages/profile";
import { TErrorPage, TErrorPageClass } from "pages/errors";

declare global {
  export type TAppPage =
    | SignUpPage
    | LoginPage
    | ChatsPage
    | ProfilePage
    | TErrorPage;

  export type TAppPageClass =
    | typeof SignUpPage
    | typeof LoginPage
    | typeof ChatsPage
    | typeof ProfilePage
    | TErrorPageClass;
}

export {};
