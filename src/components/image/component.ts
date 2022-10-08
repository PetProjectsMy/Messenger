import Block from "core/block";
import template from "./template";

type ImageProps = {
  src: string;
  alt: string;
} & ComponentCommonProps;

export class ImageElement extends Block {
  protected props: ImageProps;

  constructor({
    props,
    refs = {},
  }: {
    props: ImageProps;
    refs?: ComponentRefs;
  }) {
    props.componentName = props.componentName ?? "Image";
    super({ props, refs });
  }

  protected render(): string {
    return template;
  }
}
