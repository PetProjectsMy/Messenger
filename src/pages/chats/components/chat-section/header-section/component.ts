import { Block } from "core/dom";
import { FunctionalButton } from "./functional-button";
import template from "./template";

export class ChatSectionHeader extends Block {
  constructor() {
    const children = {} as ComponentTypings.Children;

    children.functionalButton = new FunctionalButton();

    super({ children });
  }

  protected render() {
    return template;
  }
}
