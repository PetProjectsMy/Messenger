import { Block } from "core/dom";
import { Link, HomeButton } from "components";
import { WithRouter } from "hocs";
import { EnumAppRoutes } from "core/router";
import { SignUpPageForm } from "./form-component";
import template from "./template";

const LinkWithRouter = WithRouter(Link);

export class SignUpPage extends Block {
  constructor() {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    children.signInLink = new LinkWithRouter({
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

    super({ children, props: { componentName: "SignUp Page" }, refs });
  }

  render() {
    return template;
  }
}
