import { Block } from "core/dom";
import { Link, InputForm, HomeButton } from "components";
import { withRouter } from "components/hocs";
import { EnumAppRoutes } from "core/router";
import template from "./template";
import { EnumInputFields, MapInputFieldsProps } from "./form-component";

export class LoginPage extends Block {
  constructor() {
    const children: TComponentChildren = {};
    const refs: TComponentRefs = {};

    children.loginForm = new InputForm(
      "Login",
      EnumInputFields,
      MapInputFieldsProps
    );

    const LinkWithRouter = withRouter(Link);
    children.signUpLink = new LinkWithRouter({
      props: {
        label: "Register Account",
        htmlName: "Sign up",
        htmlClass: "sign-up-link",
        events: {
          click: [
            function goToSignup() {
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
