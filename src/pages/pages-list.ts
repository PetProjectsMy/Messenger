import {
  SignUpPage,
  LoginPage,
  ChatsPage,
  ProfilePage,
  Error404Page,
} from "pages";

export enum Pages {
  SignUp = "signup",
  Login = "login",
  Chats = "chats",
  Profile = "profile",
  Error404 = "error404",
}

const map: Record<Pages, AppPageClass> = {
  [Pages.SignUp]: SignUpPage,
  [Pages.Login]: LoginPage,
  [Pages.Chats]: ChatsPage,
  [Pages.Profile]: ProfilePage,
  [Pages.Error404]: Error404Page,
};

export const getPageComponent = (page: Pages): AppPageClass => {
  return map[page];
};
