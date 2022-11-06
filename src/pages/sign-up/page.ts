import { Block } from "core/dom";
import { Link, Input, HomeButton, Button, InputValidator } from "components";
import { InputValidators } from "utils/input-validators";
import { withRouter } from "components/hocs";
import { EnumAppRoutes } from "core/router";
import template from "./template";

export class SignUpPage extends Block {
  constructor() {
    const children: ComponentChildren = {};
    const refs: ComponentRefs = {};

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

    children.homeButton = new HomeButton();

    [
      { fieldName: "email", htmlName: "email", placeholder: "Your Email" },
      { fieldName: "login", htmlName: "login", placeholder: "Your Login" },
      {
        fieldName: "firstName",
        htmlName: "first_name",
        placeholder: "First Name",
      },
      {
        fieldName: "secondName",
        htmlName: "second_name",
        placeholder: "Second Name",
      },
      { fieldName: "phone", htmlName: "phone", placeholder: "Phone Number" },
      { fieldName: "password", htmlName: "password", placeholder: "Password" },
      {
        fieldName: "passwordRepeat",
        htmlName: "password",
        placeholder: "Password (Repeat)",
      },
    ].forEach(({ fieldName, htmlName, placeholder }) => {
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
