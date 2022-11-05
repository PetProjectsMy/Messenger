import { Block } from "core/dom";
import { Link, Input, InputValidator, HomeButton, Button } from "components";
import { InputValidators } from "utils/input-validators";
import { withRouter } from "components/hocs";
import template from "./template";

export class LoginPage extends Block {
  constructor() {
    const children: ComponentChildren = {};
    const refs: ComponentRefs = {};

    // const LinkWithRouter = withRouter(Link);
    // children.signUpLink = new Link({
    //   props: {
    //     label: "Register Account",
    //     htmlName: "Sign up",
    //     htmlClass: "sign-up-link",
    //     events: {
    //       click: [
    //         function goToSignup() {
    //           this.router.go("/signup");
    //         },
    //       ],
    //     },
    //   },
    // });

    children.homeButton = new HomeButton();

    [
      ["login", "Your Login"],
      ["password", "Your Password"],
    ].forEach(([name, placeholder]: [string, string]) => {
      const inputField = new Input({
        props: {
          placeholder,
          htmlName: name,
          componentName: `${name} input with validation`,
          htmlWrapper: {
            componentAlias: "wrapped",
            htmlWrapperTemplate: `
              <div class="form-field">
                {{{ wrapped }}}
              </div>
              `,
          },
          validators: {
            blur: InputValidators[name],
          },
        },
      });

      children[`${name}Field`] = inputField;
      refs[`${name}Field`] = inputField;
    });

    super({
      children,
      props: { componentName: "Login Page" },
      refs,
    });
  }

  render() {
    return template;
  }

  protected _preInitHook(): void {
    Object.values(this.refs).forEach((inputField: Input) => {
      inputField.refs.Form = this;
    });

    ["errorLogin", "errorPassword"].forEach((stateErrorName) => {
      this.state[stateErrorName] = "";
    });

    this.children.submitButton = new Button({
      props: {
        type: "button",
        label: "submit",
        htmlClass: "submit-button",
        events: {
          click: [
            function submitForm() {
              const formRefs = this.refs as ComponentRefs;
              Object.values(formRefs).forEach((inputField: Input) => {
                const validators = inputField.getValidators();
                Object.values(validators).forEach(
                  (validator: InputValidator) => {
                    validator();
                  }
                );
              });
            }.bind(this),
          ],
        },
      },
    });
  }
}
