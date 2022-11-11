import { Input } from "components";
import { Block } from "core/dom";
import template from "./template";

const enum EnumUploadStates {
  FileNotSelected = "File not selected",
  FileSelected = "File Selected",
}

export class AvatarUploadForm extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.avatarFileInput = new Input({
      props: {
        type: "file",
        accept: "image/*",
        htmlClass: "upload-avatar",
      },
    });

    super({ children });
  }

  protected render() {
    return template;
  }
}
