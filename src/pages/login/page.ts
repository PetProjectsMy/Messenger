import { HomeButton } from "components/buttons/home-button";
import { Block } from "core/dom";
import { EnumAppRoutes } from "core/router";
import { WithRouterLink } from "hocs/components";
import { LoginPageForm } from "./form-component";
import template from "./template";

export class LoginPage extends Block {
  constructor() {
    const children: ComponentTypings.Children = {};
    const refs: ComponentTypings.Refs = {};

    children.loginForm = new LoginPageForm();
    children.signUpLink = new WithRouterLink({
      props: {
        label: "Register Account",
        htmlAttributes: { name: "Sign up" },
        htmlClasses: ["sign-up-link"],
        events: {
          click: [
            function () {
              this.router.go(EnumAppRoutes.SignUp);
            },
          ],
        },
      },
    });

    children.homeButton = new HomeButton();

    super({
      componentName: "Login Page",
      children,
      refs,
    });
  }

  render() {
    return template;
  }
}
