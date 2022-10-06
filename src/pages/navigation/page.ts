import Block from "core/block";
import { Link, Button } from "components";
import template from "./template";

export class NavigationPage extends Block {
  constructor() {
    const linkNames = [
      "login",
      "register account",
      "chats",
      "profile",
      "change profile data",
      "change password",
      "error 404",
      "error 500",
    ];
    const linkElements = linkNames.reduce((acc, linkName) => {
      acc.push(
        new Button({
          label: linkName,
          htmlElementID: `${linkName}__link`,
          events: {
            click: () => console.log(`click on ${linkName} link`),
          },
        })
      );
      return acc;
    }, []);

    super({ links: linkElements });
    // super({ links: new Button({ label: "click" }) });
  }

  render(): string {
    return template;
  }
}
