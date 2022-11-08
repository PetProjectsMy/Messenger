import getComponentTemplate from "utils/component-template-generator";

const tag = "img";
const attributes = `
  src="{{ src }}"
  alt="{{ alt }}"
`;

export default getComponentTemplate({
  tag,
  attributes,
  isSelfClosingTag: true,
});
