import { InputForm, Input } from "components";
import { WithStore } from "components/hocs";
import { afterValidationCallback } from "../../api-service";
import { MapInputFieldToProps, MapInputFieldToHelpers } from "./input-fields";
import { EnumInputFields } from "./enum-input-fields";

const InputWithStore = WithStore(Input) as any;

export class ProfilePageInputForm extends InputForm {
  constructor() {
    super({
      props: {
        componentName: "User Profile Form",
        htmlClass: "profile-data-form",
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
