import { TInputWithValidationProps } from "components/inputs/input-with-validation";
import { EnumInputFields } from "./enum-input-fields";
import { FormValidators } from "./input-validators";

export const MapInputFieldToProps: Record<
  EnumInputFields,
  Partial<TInputWithValidationProps>
> = {
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

Object.entries(MapInputFieldToProps).forEach(
  ([fieldName, props]: [
    EnumInputFields,
    Partial<TInputWithValidationProps>
  ]) => {
    props.disabledAttr = true;
    props.htmlClass = "data-input";
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

export const MapInputFieldToUserDataRecord: Record<
  EnumInputFields,
  Keys<TAppUserData>
> = {
  [EnumInputFields.FirstName]: "firstName",
  [EnumInputFields.SecondName]: "secondName",
  [EnumInputFields.DisplayName]: "displayName",
  [EnumInputFields.Login]: "login",
  [EnumInputFields.Email]: "email",
  [EnumInputFields.Phone]: "phone",
};

export const MapInputFieldToHelpers = Object.entries(
  MapInputFieldToUserDataRecord
).reduce((acc, [fieldName, recordName]) => {
  acc[fieldName] = {
    beforePropsProxyHook() {
      this.props.value = this.store.getUserData(recordName);
    },
  };

  return acc;
}, {} as any);
