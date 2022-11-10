import { Block } from "core/dom";
import { Link, InputForm, HomeButton } from "components";
import { WithRouter } from "components/hocs";
import { EnumAppRoutes } from "core/router";
import template from "./template";
import { EnumInputFields, MapInputFieldsProps } from "./form-component";
import { afterValidationCallback } from "./api-service";

export class LoginPage extends Block {
  constructor() {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    children.loginForm = new InputForm({
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldsProps,
      props: {
        afterValidationCallback,
        formTitle: "Login",
        componentName: "Login Form Component",
      },
    });

    const LinkWithRouter = WithRouter(Link);
    children.signUpLink = new LinkWithRouter({
      props: {
        label: "Register Account",
        htmlName: "Sign up",
        htmlClass: "sign-up-link",
        events: {
          click: [
            function goToLogin() {
              this.router.go(EnumAppRoutes.SignUp);
            },
          ],
        },
      },
    });

    children.homeButton = new HomeButton();

    super({
      children,
      props: { componentName: "Login Page" },
      refs,
    });
  }

  render() {
    return template;
  }
}
