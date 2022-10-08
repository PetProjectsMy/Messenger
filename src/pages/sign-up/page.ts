import Block from "core/block";
import { Link, Input, HomeButton, Button, InputValidator } from "components";
import { InputValidators } from "utils/input-validators";
import { MainPage } from "core/renderDOM";
import { LoginPage } from "pages";
import template from "./template";

export class SignUpPage extends Block {
  constructor() {
    const children: ComponentChildren = {};
    const refs: ComponentRefs = {};

    children.signInLink = new Link({
      props: {
        label: "Sign In",
        htmlName: "Sign in",
        htmlClass: "sign-in-link",
        events: {
          click: [
            () => {
              MainPage.component = new LoginPage();
            },
          ],
        },
      },
    });

    children.homeButton = new HomeButton();

    [
      ["email", "email", "Your Email"],
      ["login", "login", "Your Login"],
      ["firstName", "first_name", "First Name"],
      ["secondName", "second_name", "Second Name"],
      ["phone", "phone", "Phone Number"],
      ["password", "password", "Password"],
      ["passwordRepeat", "password", "Password (Repeat)"],
    ].forEach(([fieldName, htmlName, placeholder]) => {
      const inputField = new Input({
        props: {
          placeholder,
          componentName: `${fieldName} input with validation`,
          htmlName,
          htmlWrapper: {
            componentAlias: "wrapped",
            htmlWrapperTemplate:
              "<div class='form-field'>{{{ wrapped }}}</div>",
          },
          validators: {
            blur: InputValidators[fieldName],
          },
        },
      });

      children[`${fieldName}Field`] = inputField;
      refs[`${fieldName}Field`] = inputField;
    });

    super({ children, props: { componentName: "Sign Up Page" }, refs });
  }

  render() {
    return template;
  }

  protected _preInitHook(): void {
    Object.values(this.refs).forEach((inputField: Input) => {
      inputField.refs.Form = this;
    });

    [
      "errorEmail",
      "errorLogin",
      "errorFirstName",
      "errorSecondName",
      "errorPhone",
      "errorPassword",
      "errorPasswordRepeated",
    ].forEach((stateErrorName) => {
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
                Object.values(inputField.validators).forEach(
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
