import { TInputValidatorsByEvents } from "components/input/component";
import { EnumInputFields } from "./enum-input-fields";
import { FormValidators } from "./input-validators";

type TInputInitFieldProps = {
  htmlName: string;
  validators: TInputValidatorsByEvents;
  htmlWrapper?: TComponentWrapper;
};

const MapInputFieldsPropsBase: Record<string, TInputInitFieldProps> = {
  [EnumInputFields.FirstName]: {
    htmlName: "first_name",
    validators: FormValidators[EnumInputFields.FirstName],
  },
  [EnumInputFields.SecondName]: {
    htmlName: "second_name",
    validators: FormValidators[EnumInputFields.SecondName],
  },
  [EnumInputFields.DisplayName]: {
    htmlName: "display_name",
    validators: FormValidators[EnumInputFields.DisplayName],
  },
  [EnumInputFields.Login]: {
    htmlName: "login",
    validators: FormValidators[EnumInputFields.Login],
  },
  [EnumInputFields.Email]: {
    htmlName: "email",
    validators: FormValidators[EnumInputFields.Email],
  },
  [EnumInputFields.Phone]: {
    htmlName: "phone",
    validators: FormValidators[EnumInputFields.Phone],
  },
};

const MapInputFieldToDataType = {
  [EnumInputFields.FirstName]: "first name",
  [EnumInputFields.SecondName]: "second name",
  [EnumInputFields.DisplayName]: "display name",
  [EnumInputFields.Login]: "login",
  [EnumInputFields.Email]: "email",
  [EnumInputFields.Phone]: "phone",
};

Object.entries(MapInputFieldsPropsBase).forEach(
  ([fieldName, props]: [EnumInputFields, TInputInitFieldProps]) => {
    props.htmlWrapper = {
      componentAlias: "wrappedDataInput",
      htmlWrapperTemplate: `
      <field class="data-field">
        <div class="data-type-section">
          <span class="data-type"> ${MapInputFieldToDataType[fieldName]} </span>
        </div>
        <div class="data-input-section">
          {{{ wrappedDataInput }}}
        </div>
      </field>
    `,
    };
  }
);

export const MapInputFieldsProps = MapInputFieldsPropsBase;
