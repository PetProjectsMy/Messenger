export default function getComponentTemplate({
  tag,
  content = null,
  isSelfClosingTag = false,
}: {
  tag: string;
  content?: Nullable<string>;
  isSelfClosingTag?: boolean;
}) {
  return `
    <${tag}
      {{#if wrappedId}} 
        wrapped-id="{{wrappedId}}" 
      {{/if}}
    >
      ${content ?? ""}
    ${!isSelfClosingTag ? `</${tag}>` : ""}
    `;
}
