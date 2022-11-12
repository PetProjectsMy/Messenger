import { Button } from "components";
import { type Block } from "core/dom";

export async function submitButtonOnClickCallback() {
  const { form } = this.refs;

  form.clearAPIResponseState();
  form._validateForm();
  // form.props.afterValidationCallback.call(form); // DEBUG
  if (!form.state.formHasInputErrors) {
    console.log(
      `Form filled correctly: ${JSON.stringify(form.collectFormData())}`
    );
    await form.props.afterValidationCallback!.call(form);
  }
}

export class FormSubmitButton extends Button {
  constructor(refs: { form: Block }) {
    super({
      refs,
      props: {
        type: "button",
        label: "submit",
        htmlClass: "submit-button",
        events: {
          click: [submitButtonOnClickCallback],
        },
      },
    });
  }
}
