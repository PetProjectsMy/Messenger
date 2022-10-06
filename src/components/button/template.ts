export default `
<button 
  {{#if buttonElementType}} 
    type="{{buttonElementType}}" 
  {{else}} 
    type="button" 
  {{/if}}
  
  {{#if htmlElementClass}} 
    class="{{htmlElementClass}}" 
  {{/if}}

  {{#if htmlElementid}} 
    id="{{htmlElementid}}" 
  {{/if}}
>
  {{ label }}
</button>
`;
