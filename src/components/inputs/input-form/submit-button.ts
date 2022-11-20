import { Button } from "components/buttons";
import { type Block } from "core/dom";

export async function formSubmitButtonCallback() {
  const { form } = this.refs;
  this.state.apiResponseSuccess = "";
  form._validateForm();
  if (form.state.apiResponseError !== form.constructor.validationFailedError) {
    await form.props.afterValidationCallback!.call(form);
  }
}

export class FormSubmitButton extends Button {
  constructor(refs: { form: Block }) {
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
