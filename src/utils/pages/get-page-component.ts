import { NavigationPage } from "pages/navigation";
import { SignUpPage } from "pages/sign-up";
import { LoginPage } from "pages/login";
import { ChatsPage } from "pages/chats";
import { ProfilePage } from "pages/profile";
import { EnumAppPages } from "pages/enum-app-pages";
import {
  NotFoundErrorPage,
  AuthorizationRequiredErrorPage,
} from "pages/errors";

const map = {
  [EnumAppPages.Navigation]: NavigationPage,
  [EnumAppPages.SignUp]: SignUpPage,
  [EnumAppPages.Login]: LoginPage,
  [EnumAppPages.Chats]: ChatsPage,
  [EnumAppPages.Profile]: ProfilePage,
  [EnumAppPages.NotFound]: NotFoundErrorPage,
  [EnumAppPages.Forbidden]: AuthorizationRequiredErrorPage,
};

export const getPageComponent = (page: EnumAppPages): TAppPageClass => {
  return map[page];
};
