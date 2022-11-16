import { InputForm } from "components";
import { WithStoreValidatedInput } from "hocs/components";
import { afterValidationCallback } from "./after-validation-callback";
import {
  EnumInputFields,
  MapInputFieldToProps,
  MapInputFieldToHelpers,
} from "./fields";

export class ProfilePageInputForm extends InputForm {
  constructor() {
    super({
      props: {
        htmlClasses: ["profile-data-form"],
        isSubmitButtonNeeded: false,
        afterValidationCallback,
      },
      InputClass: WithStoreValidatedInput as any,
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldToProps,
      mapInputToHelpers: MapInputFieldToHelpers,
    });
  }
}
