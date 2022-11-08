import { Block } from "core/dom";
import template from "./template";

export type TImageProps = {
  src: string;
  alt: string;
} & TComponentCommonProps;

export class ImageComponent extends Block {
  protected props: TImageProps;

  constructor({
    props,
    refs = {},
  }: {
    props: TImageProps;
    refs?: TComponentRefs;
  }) {
    props.componentName = props.componentName ?? "Image";
    super({ props, refs });
  }

  protected render(): string {
    return template;
  }
}
