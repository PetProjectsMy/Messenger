import getComponentTemplate from "utils/component-template-generator";

const tag = "a";
const attributes = `
  {{#if href}} 
    href="{{ href }}" 
  {{else}} 
    href="javascript:void(0);" 
  {{/if}}
`;
const content = "{{ label }}";

export default getComponentTemplate({ tag, attributes, content });
