import Block from "core/block";
import { Link } from "components";
import { LoginPage, SignUpPage, ChatsPage } from "pages";

import { MainPage } from "core/renderDOM";
import template from "./template";

export class NavigationPage extends Block {
  static readonly linkIDToPageMap = {
    login: LoginPage,
    register_account: SignUpPage,
    chats: ChatsPage,
  };

  constructor() {
    const linkNames = [
      "login",
      "register_account",
      "chats",
      "profile",
      "change_profile_data",
      "change_password",
      "error_404",
      "error_500",
    ];
    const linkElements = linkNames.reduce((acc, linkName) => {
      acc.push(
        new Link({
          props: {
            label: linkName,
            htmlId: `${linkName}_link`,
            events: {
              click: () => {
                console.log(`click on ${linkName} link`);
                const Component = NavigationPage.linkIDToPageMap[linkName];
                MainPage.component = new Component();
              },
            },
          },
        })
      );
      return acc;
    }, []);

    super({ children: { links: linkElements } });
  }

  render(): string {
    return template;
  }
}
