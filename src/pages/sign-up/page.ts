import { Block } from "core/dom";
import { HomeButton } from "components/buttons/home-button";
import { WithRouterLink } from "hocs/components";
import { EnumAppRoutes } from "core/router";
import { SignUpPageForm } from "./form-component";
import template from "./template";

export class SignUpPage extends Block {
  constructor() {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    children.signInLink = new WithRouterLink({
      props: {
        label: "Sign In",
        htmlAttributes: { name: "Sign in" },
        htmlClasses: ["sign-in-link"],
        events: {
          click: [
            function () {
              this.router.go(EnumAppRoutes.Login);
            },
          ],
        },
      },
    });

    children.signupForm = new SignUpPageForm();
    children.homeButton = new HomeButton();

    super({ componentName: "SignUp Page", children, refs });
  }

  render() {
    return template;
  }
}
