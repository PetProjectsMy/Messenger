import { Block } from "core/dom";
import { Link, HomeButton, InputForm } from "components";
import { withRouter } from "components/hocs";
import { EnumAppRoutes } from "core/router";
import { EnumInputFields, MapInputFieldsProps } from "./input-fields";
import { SignupFormValidators } from "./input-validators";
import template from "./template";

export class SignUpPage extends Block {
  constructor() {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    children.signInLink = new (withRouter(Link))({
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

    children.signupForm = new InputForm(
      "Sign Up",
      EnumInputFields,
      MapInputFieldsProps,
      SignupFormValidators
    );
    children.homeButton = new HomeButton();

    super({ children, props: { componentName: "SignUp Page" }, refs });
  }

  render() {
    return template;
  }
}
