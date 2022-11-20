import { TInputWithValidationProps } from "components/inputs/input-with-validation";
import { EnumInputFields } from "./enum-input-fields";
import { FormValidators } from "./input-validators";

export const MapInputFieldToProps: Record<
  EnumInputFields,
  Partial<TInputWithValidationProps>
> = {
  [EnumInputFields.FirstName]: {
    htmlAttributes: { name: "first_name" },
    validators: FormValidators[EnumInputFields.FirstName],
  },
  [EnumInputFields.SecondName]: {
    htmlAttributes: { name: "second_name" },
    validators: FormValidators[EnumInputFields.SecondName],
  },
  [EnumInputFields.DisplayName]: {
    htmlAttributes: { name: "display_name" },
    validators: FormValidators[EnumInputFields.DisplayName],
  },
  [EnumInputFields.Login]: {
    htmlAttributes: { name: "login" },
    validators: FormValidators[EnumInputFields.Login],
  },
  [EnumInputFields.Email]: {
    htmlAttributes: { name: "email" },
    validators: FormValidators[EnumInputFields.Email],
  },
  [EnumInputFields.Phone]: {
    htmlAttributes: { name: "phone" },
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
    props.htmlClasses = ["data-input"];
    props.htmlWrapper = {
      componentAlias: "wrappedDataInput",
      htmlWrapperTemplate: `
      <field class="data-field">
        <div class="data-type-section">
          <span class="data-type"> ${MapInputFieldToDataType[fieldName]} </span>
        </div>
        <div class="data-input-section">
          {{{ wrappedDataInput }}}
          \\{{#if inputError}}
            <span class="input-error"> \\{{ inputError }} </span>
          \\{{/if}}
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
      this.setPropByPath(
        "htmlAttributes.value",
        this.store.getUserDataByPath(recordName)
      );
    },

    afterRenderHook() {
      this.toggleDisabledState(true);
    },
  };

  return acc;
}, {} as any);
