import { Block } from "core/dom";
import template from "./template";

export type TImageProps = {
  src: string;
  alt: string;
} & TComponentCommonProps;

export class ImageComponent extends Block<TImageProps> {
  protected render(): string {
    return template;
  }
}
