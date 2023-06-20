import getComponentTemplate from "utils/components/component-template-generator";

export default function getInputFormTemplate(
  enumFormFieldsNames: Record<string, string>
): string {
  const tag = "form";

  let content = `
    {{#if formTitle}} 
      <legend>
        <h1>{{{ formTitle }}}</h1>
      </legend>
    {{/if}}
    <fieldset class="form-fields">
  `;
  Object.values(enumFormFieldsNames).forEach((fieldName) => {
    content = `
      ${content}
      {{{ ${fieldName} }}}
    `;
  });
  content = `
      ${content}
      {{#if apiResponseSuccess }} 
        <span class="api-success"> {{ apiResponseSuccess }} </span>
      {{/if}}
      {{#if apiResponseError }} 
        <span class="api-error"> {{ apiResponseError }} </span>
      {{/if}}
      {{#if hasSubmitButton}}
        <div class="submit-button-section">
          {{{ submitButton }}}
        </div>
      {{/if}}
    </fieldset>
  `;

  return getComponentTemplate({ tag, content });
}
