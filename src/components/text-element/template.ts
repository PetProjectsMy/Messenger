import getComponentTemplate from "utils/component-template-generator";

const content = `
{{#if text}}
  {{ text }}
{{else}}
  ""
{{/if}}
`;

export default (tag: string) => getComponentTemplate({ tag, content });
