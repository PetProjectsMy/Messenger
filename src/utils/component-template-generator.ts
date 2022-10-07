export default function getTemplate({
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
    >
      ${content ?? ""}
    ${!isSelfClosingTag ? `</${tag}>` : ""}
    `;
}
