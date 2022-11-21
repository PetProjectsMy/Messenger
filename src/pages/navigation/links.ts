import { EnumAppPages } from "pages/enum-app-pages";
import { EnumAppRoutes } from "core/router";
import { TLinkProps } from "components/link";

export enum EnumNavigationPageLinks {
  SignUp = EnumAppPages.SignUp,
  Login = EnumAppPages.Login,
  Chats = EnumAppPages.Chats,
  Profile = EnumAppPages.Profile,
}

export const MapNavigationLinkToRoute: Record<string, EnumAppRoutes> = {
  [EnumNavigationPageLinks.SignUp]: EnumAppRoutes.SignUp,
  [EnumNavigationPageLinks.Login]: EnumAppRoutes.Login,
  [EnumNavigationPageLinks.Chats]: EnumAppRoutes.Chats,
  [EnumNavigationPageLinks.Profile]: EnumAppRoutes.Profile,
};

export const MapNavigationLinkToProps: Record<string, TLinkProps> = {
  [EnumNavigationPageLinks.SignUp]: {
    label: "Sign Up",
    htmlAttributes: { id: `signup_link` },
  },
  [EnumNavigationPageLinks.Login]: {
    label: "Login",
    htmlAttributes: { id: `login_link` },
  },
  [EnumNavigationPageLinks.Chats]: {
    label: "Chats",
    htmlAttributes: { id: `chats_link` },
  },
  [EnumNavigationPageLinks.Profile]: {
    label: "Profile",
    htmlAttributes: { id: `pforile_link` },
  },
};

Object.entries(MapNavigationLinkToProps).forEach(([linkName, props]) => {
  const eventHandler = function () {
    const route = MapNavigationLinkToRoute[linkName];
    this!.router.go(route);
  };
  props.events = { click: [eventHandler] };
});
