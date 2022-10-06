export default `
<a 
  {{#if linkHREF}} 
    href="{{linkHREF}}" 
  {{else}} 
    href="#app" 
  {{/if}}
  
  {{#if htmlElementClass}} 
    class="{{htmlElementClass}}" 
  {{/if}}

  {{#if htmlElementid}} 
    id="{{htmlElementid}}" 
  {{/if}}
>
  {{ label }}
</a>
`;
