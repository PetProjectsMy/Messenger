import { Block } from "core/dom";
import { Link, HomeButton, InputForm } from "components";
import { WithRouter } from "components/hocs";
import { EnumAppRoutes } from "core/router";
import { EnumInputFields, MapInputFieldsProps } from "./form-component";
import template from "./template";
import { afterValidationCallback } from "./api-service";

export class SignUpPage extends Block {
  constructor() {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    children.signInLink = new (WithRouter(Link))({
      props: {
        label: "Sign In",
        htmlName: "Sign in",
        htmlClass: "sign-in-link",
        events: {
          click: [
            function goToLogin() {
              this.router.go(EnumAppRoutes.Login);
            },
          ],
        },
      },
    });

    children.signupForm = new InputForm({
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldsProps,
      props: {
        afterValidationCallback,
        formTitle: "Sign Up",
        componentName: "SignUp Form Component",
      },
    });
    children.homeButton = new HomeButton();

    super({ children, props: { componentName: "SignUp Page" }, refs });
  }

  render() {
    return template;
  }
}
