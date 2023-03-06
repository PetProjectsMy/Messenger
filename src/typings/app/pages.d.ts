import type {
  ChatsPage as TChatsPage,
  LoginPage as TLoginPage,
  NavigationPage as TNavigationPage,
  ProfilePage as TProfilePage,
  SignUpPage as TSignUpPage,
} from "pages";
import type { TErrorPage, TErrorPageClass } from "pages/errors";

declare global {
  export namespace PagesTypings {
    export type AppPage =
      | TChatsPage
      | TErrorPage
      | TLoginPage
      | TNavigationPage
      | TProfilePage
      | TSignUpPage;

    export type PageClass =
      | typeof TChatsPage
      | typeof TLoginPage
      | typeof TNavigationPage
      | typeof TProfilePage
      | typeof TSignUpPage
      | TErrorPageClass;

    export type ChatsPage = TChatsPage;
    export type ErrorPage = TErrorPage;
    export type LoginPage = TLoginPage;
    export type NavigationPage = TNavigationPage;
    export type ProfilePage = TProfilePage;
    export type SignUpPage = TSignUpPage;
  }
}
