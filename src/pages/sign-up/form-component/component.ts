import { InputForm } from "components/inputs/input-form";
import { afterSubmitCallback } from "./after-submit-callback";
import { EnumInputFields, MapInputFieldsProps } from "./fields";

export class SignUpPageForm extends InputForm<typeof EnumInputFields> {
  constructor() {
    super({
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldsProps,
      props: {
        afterSubmitCallback,
        formTitle: "Sign Up",
      },
    });
  }
}
