import Block from "core/block";
import { Link, Input, HomeButton } from "components";
import { MainPage } from "core/renderDOM";
import { LoginPage } from "pages";
import template from "./template";

export class SignUpPage extends Block {
  constructor() {
    const children: ComponentChildren = {};

    children.submitButton = new Input({
      props: {
        type: "submit",
        value: "submit",
        htmlClass: "submit-button",
      },
    });

    children.signInLink = new Link({
      props: {
        label: "Sign In",
        htmlName: "Sign in",
        htmlClass: "sign-in-link",
        events: {
          click: () => {
            console.log(`Click on sign in link`);
            MainPage.component = new LoginPage();
          },
        },
      },
    });

    children.homeButton = new HomeButton();

    children.formFields = [
      ["email", "Your Email"],
      ["login", "Your Login"],
      ["first_name", "First Name"],
      ["second_name", "Second Name"],
      ["phone", "Phone Number"],
      ["password", "Password"],
      ["login", "Password (Repeat)"],
    ].map(([name, placeholder]) => {
      return new Input({
        props: {
          placeholder,
          htmlName: name,
          htmlWrapper: {
            componentAlias: "wrapped",
            htmlWrapperTemplate:
              "<div class='form-field'>{{{ wrapped }}}</div>",
          },
        },
      });
    });

    super({ children });
  }

  render() {
    return template;
  }
}
