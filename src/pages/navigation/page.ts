import { Block, MainPage } from "core/dom";
import { Link } from "components";
import { LoginPage, SignUpPage, ChatsPage, ProfilePage } from "pages";
import template from "./template";

export class NavigationPage extends Block {
  static readonly linkIDToPageMap: Record<string, TAppPageClass> = {
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
                  const Page = NavigationPage.linkIDToPageMap[linkName];

                  if (Page) {
                    MainPage.component = new Page({
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
