import getComponentTemplate from "utils/component-template-generator";

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
    const errorName = `${fieldName}_error`;

    content = `
      ${content}
      {{{ ${fieldName}_child }}}
      {{#if ${errorName}}}
        <span class="${errorName}"> {{ ${errorName} }} </span>
      {{/if}}
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
      {{#if isSubmitButtonNeeded}}
        <div class="submit-button-section">
          {{{ submitButton }}}
        </div>
      {{/if}}
    </fieldset>
  `;

  return getComponentTemplate({ tag, content });
}
