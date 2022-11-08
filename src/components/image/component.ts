import { Block } from "core/dom";
import template from "./template";

type ImageProps = {
  src: string;
  alt: string;
} & TComponentCommonProps;

export class ImageElement extends Block {
  protected props: ImageProps;

  constructor({
    props,
    refs = {},
  }: {
    props: ImageProps;
    refs?: TComponentRefs;
  }) {
    props.componentName = props.componentName ?? "Image";
    super({ props, refs });
  }

  protected render(): string {
    return template;
  }
}
