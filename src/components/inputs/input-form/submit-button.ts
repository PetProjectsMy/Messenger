import { Button } from "components/buttons";

export async function formSubmitButtonCallback(this: Button) {
  const form = this.refs.form as ComponentTypings.InputForm;
  this.state.apiResponseSuccess = "";

  form.validateForm();
  if (form.getAPIResponseError() === "") {
    await form.callAfterSubmitCallback();
  }
}

export class FormSubmitButton extends Button {
  constructor(refs: {
    form: ComponentTypings.InputForm<Record<string, string>>;
  }) {
    super({
      refs,
      props: {
        label: "submit",
        htmlClasses: ["submit-button"],
        events: {
          click: [formSubmitButtonCallback],
        },
      },
    });
  }
}
