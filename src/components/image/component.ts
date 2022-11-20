import { Block } from "core/dom/block";
import template from "./template";

export type TImageProps = WithComponentCommonProps<{
  htmlAttributes: {
    src: string;
    alt: string;
  };
}>;

export class ImageComponent extends Block<TImageProps> {
  protected render(): string {
    return template;
  }
}
