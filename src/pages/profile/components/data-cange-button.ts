import { Button } from "components/buttons";
import { formSubmitButtonCallback } from "components/inputs/input-form";

const enum FormMode {
  DataSaved = "data_saved",
  DataChanging = "data_changing",
}
export class DataChangeButton extends Button {
  constructor(refs: { form: ComponentTypings.Block }) {
    async function onClickCallback(this: DataChangeButton) {
      const form = this.refs.form as ComponentTypings.InputForm;

      form.setStateByPath({
        pathString: "apiResponseSuccess",
        value: "",
        isLogNeeded: true,
      });

      if (this.state.mode === FormMode.DataSaved) {
        this.state.mode = FormMode.DataChanging;
        this.props.label = "save data";

        Object.values(form.refs).forEach(
          (dataField: ComponentTypings.Input) => {
            dataField.toggleDisabledState();
          }
        );
      } else {
        await formSubmitButtonCallback.call(this);

        if (form.getAPIResponseError() === "") {
          this.state.mode = FormMode.DataSaved;
          this.props.label = "change data";

          Object.values(form.refs).forEach(
            (dataField: ComponentTypings.Input) => {
              dataField.toggleDisabledState();
            }
          );
        }
      }
    }

    super({
      state: {
        mode: FormMode.DataSaved,
      },
      refs,
      props: {
        label: "change data",
        htmlClasses: ["change-data-button"],
        events: {
          click: [onClickCallback],
        },
      },
    });
  }
}
