import { EnumAppPages } from "utils/pages";

export const enum EnumAppRoutes {
  SignUp = "signup_route",
  Login = "login_route",
  Chats = "chats_route",
  Profile = "profile_route",
  NotFound = "not_found_route",
  NotAuthorized = "not_authorized_route",
}

export const AppRoutesData = {
  [EnumAppRoutes.SignUp]: {
    path: "/signup",
    block: EnumAppPages.SignUp,
    needAuthorization: false,
  },
  [EnumAppRoutes.Login]: {
    path: "/login",
    block: EnumAppPages.Login,
    needAuthorization: false,
  },
  [EnumAppRoutes.Chats]: {
    path: "/chats",
    block: EnumAppPages.Chats,
    needAuthorization: true,
  },
  [EnumAppRoutes.Profile]: {
    path: "/profile",
    block: EnumAppPages.Profile,
    needAuthorization: true,
  },
  [EnumAppRoutes.NotFound]: {
    path: "/not-found",
    block: EnumAppPages.NotFound,
    needAuthorization: false,
  },
  [EnumAppRoutes.NotAuthorized]: {
    path: "/not-authorized",
    block: EnumAppPages.Forbidden,
    needAuthorization: false,
  },
};
