import getComponentTemplate from "utils/component-template-generator";

const tag = "input";
const attributes = `
  {{#if type }}
    type="{{ type }}"
  {{else}}
    type="text"
  {{/if}}

  {{#if accept}}
    accept="{{ accept }}"
  {{/if}}

  {{#if value }}
    value="{{ value }}"
  {{/if}}

  {{#if placeholder}}
    placeholder="{{ placeholder }}"
  {{/if}}

  {{#if disabledAttr}}
    disabled
  {{/if}}
`;

export default getComponentTemplate({ tag, attributes });
