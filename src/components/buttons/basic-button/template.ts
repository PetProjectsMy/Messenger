import getComponentTemplate from "utils/component-template-generator";

const tag = "button";
const attributes = `
  {{#if type}} 
    type="{{ type }}" 
  {{else}} 
    type="button" 
  {{/if}}
`;
const content = `
{{#if label}}
  {{ label }}
{{/if}}
`;

export default getComponentTemplate({ tag, attributes, content });
