import { Button } from "components";
import { type Block } from "core/dom";

export async function formSubmitButtonCallback() {
  const { form } = this.refs;

  form._validateForm();
  if (form.apiResponseError !== form.constructor.validationFailedError) {
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
