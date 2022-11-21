import { Block } from "core/dom";
import { HomeButton } from "components/buttons/home-button";
import template from "./template";

export class HeaderSection extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.homeButton = new HomeButton();

    super({ children });
  }

  protected render() {
    return template;
  }
}
