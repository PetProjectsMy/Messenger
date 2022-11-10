import { type Block } from "core/dom";
import { Button, type Input } from "components";
import { submitButtonOnClickCallback } from "components/input-form";

export class DataChangeButton extends Button {
  constructor(refs: { form: Block; page: Block }) {
    const enum FormMode {
      DataSaved = "data_saved",
      DataChanging = "data_changing",
    }

    async function onClickCallback() {
      const { form } = this.refs;

      if (this.state.mode === FormMode.DataSaved) {
        form.state.apiResponseSuccess = "";
        form._render();

        this.state.mode = FormMode.DataChanging;
        this.props.label = "save data";

        Object.values(form.refs).forEach((dataField: Input) => {
          dataField.toggleDisableState();
        });
      } else {
        await submitButtonOnClickCallback.call(this);
        if (form.getAPIResponseError() === "") {
          this.refs.page.userDidUpdate();

          this.state.mode = FormMode.DataSaved;
          this.props.label = "change data";

          Object.values(form.refs).forEach((dataField: Input) => {
            dataField.toggleDisableState();
          });
        }
      }
    }

    super({
      state: {
        mode: FormMode.DataSaved,
      },
      refs,
      props: {
        componentName: "change/save data button",
        label: "change data",
        htmlClass: "change-data-button",
        events: {
          click: [onClickCallback],
        },
      },
    });
  }
}
