import Block from "core/block";
import { Link } from "components";
import { LoginPage, SignUpPage, ChatsPage, ProfilePage } from "pages";

import { MainPage } from "core/renderDOM";
import template from "./template";

export class NavigationPage extends Block {
  static readonly linkIDToPageMap: Record<string, typeof Block> = {
    login: LoginPage,
    register_account: SignUpPage,
    chats: ChatsPage,
    profile: ProfilePage,
  };

  constructor() {
    const linkNames = [
      "login",
      "register_account",
      "chats",
      "profile",
      "change_password",
      "error_404",
      "error_500",
    ];
    const linkElements = linkNames.reduce((acc: Link[], linkName) => {
      acc.push(
        new Link({
          props: {
            label: linkName,
            htmlId: `${linkName}_link`,
            events: {
              click: [
                () => {
                  const Component = NavigationPage.linkIDToPageMap[linkName];

                  if (Component) {
                    MainPage.component = new Component({
                      props: { componentName: linkName },
                    });
                  }
                },
              ],
            },
          },
        })
      );
      return acc;
    }, []);

    super({
      children: { links: linkElements },
      props: { componentName: "Navigation Page" },
    });
  }

  render(): string {
    return template;
  }
}
