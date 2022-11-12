export default function getComponentTemplate({
  tag,
  attributes = null,
  content = null,
  isSelfClosingTag = false,
}: {
  tag: string;
  attributes?: Nullable<string>;
  content?: Nullable<string>;
  isSelfClosingTag?: boolean;
}) {
  return `
    <${tag}
      ${attributes ?? ""}
      
      {{#if htmlClass}} 
        class="{{htmlClass}}" 
      {{/if}}
        
      {{#if htmlId}} 
        id="{{htmlId}}" 
      {{/if}}

      {{#if htmlName}}
        name="{{htmlName}}" 
      {{/if}}

      {{#if htmlStyle}}
        style="{{htmlStyle}}" 
      {{/if}}

      {{#if wrappedId}} 
        wrapped-id="{{wrappedId}}" 
      {{/if}}
        
    >
      ${content ?? ""}
    ${!isSelfClosingTag ? `</${tag}>` : ""}
    `;
}
