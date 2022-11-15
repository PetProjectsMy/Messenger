import getTemplate from "utils/component-template-generator";

const tag = "img";
const attributes = `
  src="{{ src }}"
  alt="{{ alt }}"
`;

export default getTemplate({ tag, attributes, isSelfClosingTag: true });
