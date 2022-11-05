import { Block } from "core/dom";
import template from "./template";

export class Error404Page extends Block {
  protected render(): string {
    return template;
  }
}
