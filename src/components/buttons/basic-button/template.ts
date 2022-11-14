import getComponentTemplate from "utils/component-template-generator";

const tag = "button";

const content = `
{{#if label}}
  {{ label }}
{{/if}}
`;

export default getComponentTemplate({ tag, content });
