import { Block } from "core/dom";
import { Link } from "components/link";
import { HomeButton } from "components/buttons/home-button";
import { WithRouter } from "hocs";
import { EnumAppRoutes } from "core/router";
import template from "./template";
import { LoginPageForm } from "./form-component";

const LinkWithRouter = WithRouter(Link);
export class LoginPage extends Block {
  constructor() {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    children.loginForm = new LoginPageForm();
    children.signUpLink = new LinkWithRouter({
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
