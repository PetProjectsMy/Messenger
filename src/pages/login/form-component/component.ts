import { InputForm } from "components/inputs/input-form";
import { afterValidationCallback } from "./after-validation-callback";

import { EnumInputFields, MapInputFieldsProps } from "./fields";

export class LoginPageForm extends InputForm {
  constructor() {
    super({
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldsProps,
      props: {
        afterValidationCallback,
        formTitle: "Login",
      },
    });
  }
}
