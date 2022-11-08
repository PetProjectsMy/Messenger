import getComponentTemplate from "utils/component-template-generator";

export default function getInputFormTemplate(
  enumFormFieldsNames: Record<string, string>
): string {
  const tag = "form";

  let content = `
    <legend>
      <h1>{{{ formTitle }}}</h1>
    </legend>
    <fieldset class="form-fields">
  `;
  Object.values(enumFormFieldsNames).forEach((fieldName) => {
    content = `
      ${content}
      {{{ ${fieldName}_child }}}
      {{ ${fieldName}_error }}
    `;
  });
  content = `
      ${content}
      {{#if apiResponseSuccess }} 
        <span style="color:green"> {{ api_response_success }} </span>
      {{else}}
        {{#if apiResponseError }} 
          <span style="color:red"> {{ apiResponseError }} </span>
        {{/if}}
      {{/if}}
      <div class="submit-button-section">
        {{{ submitButton }}}
      </div>
    </fieldset>
  `;

  return getComponentTemplate({ tag, content });
}
