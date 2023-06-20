import { ChatsPage } from "pages/chats";
import { EnumAppPages } from "pages/enum-app-pages";
import {
  AuthorizationRequiredErrorPage,
  NotFoundErrorPage,
} from "pages/errors";
import { LoginPage } from "pages/login";
import { NavigationPage } from "pages/navigation";
import { ProfilePage } from "pages/profile";
import { SignUpPage } from "pages/sign-up";

const map = {
  [EnumAppPages.Navigation]: NavigationPage,
  [EnumAppPages.SignUp]: SignUpPage,
  [EnumAppPages.Login]: LoginPage,
  [EnumAppPages.Chats]: ChatsPage,
  [EnumAppPages.Profile]: ProfilePage,
  [EnumAppPages.NotFound]: NotFoundErrorPage,
  [EnumAppPages.Forbidden]: AuthorizationRequiredErrorPage,
};

export const getPageComponent = (
  page: EnumAppPages
): PagesTypings.PageClass => {
  return map[page];
};
