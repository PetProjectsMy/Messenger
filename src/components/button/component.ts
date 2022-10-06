import Block from "core/block";
import template from "./template";

type ButtonProps = WithHTMLProps<{
  label: string;
  events?: {
    click: EventListener;
  };
}>;

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
