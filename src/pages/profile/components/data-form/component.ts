import { InputForm } from "components/inputs/input-form";
import { WithStoreValidatedInput } from "hocs/components";
import { afterSubmitCallback } from "./after-submit-callback";
import {
  EnumInputFields,
  MapInputFieldToHelpers,
  MapInputFieldToProps,
} from "./fields";

export class ProfilePageInputForm extends InputForm<typeof EnumInputFields> {
  constructor() {
    super({
      props: {
        htmlClasses: ["profile-data-form"],
        hasSubmitButton: false,
        afterSubmitCallback,
      },
      InputClass: WithStoreValidatedInput as any,
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldToProps,
      mapInputToHelpers: MapInputFieldToHelpers,
    });
  }
}
