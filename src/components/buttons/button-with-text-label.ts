/* eslint-disable @typescript-eslint/no-useless-constructor */

import Block from "../core/block";
import { EventListener } from "../utils/types";
import template from "./button.hbs";

const template: string = `
<button 
  type="button" 
  {{#if className}}class="{{className}}"{{/if}}
>
  {{ label }}
</button>
`;

type ButtonProps = {
  label: string;
  events?: {
    click: EventListener;
  };
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
