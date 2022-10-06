import Block from "core/block";
import template from "./template";

type LinkProps = WithHTMLProps<{
  label: string;
  href?: string;
  events?: {
    click: EventListener;
  };
}>;

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
