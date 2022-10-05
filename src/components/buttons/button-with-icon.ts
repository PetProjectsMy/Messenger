import Block from "core/block";

const template = `
<button 
  type="button" 
  {{#if className}}class="{{className}}"{{/if}}
  style="
    background-image: url('{{iconPath}}');
    background-size: cover; 
    height: 100px;
    width: 100px;
  "
>
  {{ label }}
</button>
`;

export class Button extends Block {
  constructor(props) {
    super({
      name: "ButtonWithIcon",
      classname: props.classname ?? "button_with_icon",
      ...props,
      events: {
        click: () => {
          console.log("click button with icon");
        },
      },
    });
  }

  render() {
    return template;
  }
}
