import * as Pages from "pages";
import { EnumAppPages } from "./enum-app-pages";

const map = {
  [EnumAppPages.SignUp]: Pages.SignUpPage,
  [EnumAppPages.Login]: Pages.LoginPage,
  [EnumAppPages.Chats]: Pages.ChatsPage,
  [EnumAppPages.Profile]: Pages.ProfilePage,
  [EnumAppPages.NotFound]: Pages.NotFoundErrorPage,
  [EnumAppPages.Forbidden]: Pages.AuthorizationRequiredErrorPage,
};

export const getPageComponent = (page: EnumAppPages): TAppPageClass => {
  return map[page];
};