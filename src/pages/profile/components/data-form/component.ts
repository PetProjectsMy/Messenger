import { InputForm, InputWithValidation } from "components";
import { WithStore } from "components/hocs";
import { afterValidationCallback } from "./after-validation-callback";
import {
  EnumInputFields,
  MapInputFieldToProps,
  MapInputFieldToHelpers,
} from "./fields";

const InputWithStore = WithStore(InputWithValidation) as any;

export class ProfilePageInputForm extends InputForm {
  constructor() {
    super({
      props: {
        componentName: "User Profile Form",
        htmlClasses: ["profile-data-form"],
        isSubmitButtonNeeded: false,
        afterValidationCallback,
      },
      InputClass: InputWithStore,
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldToProps,
      mapInputToHelpers: MapInputFieldToHelpers,
    });
  }
}
