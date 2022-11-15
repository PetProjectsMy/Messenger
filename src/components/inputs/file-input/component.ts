import { type Block } from "core/dom";
import { deepMerge } from "utils/objects-handle";
import { Input } from "components/inputs";
import { Button, TButtonProps } from "components/buttons";
import { TInputProps } from "components/inputs/basic-input";
import template from "./template";

export const enum EnumFileUploadingStatus {
  FileNotSelected = "File not selected",
  FileSelected = "File selected",
  FileUploaded = "File uploaded",
}

type TFileInputProps = TInputProps & {
  htmlAttributes: { name: string; type?: "file"; accept?: string };
  events?: {
    change: TEventListener[];
  };
};

type TchooseButtonProps = TButtonProps & {
  events?: {
    click?: TEventListener[];
  };
};

const FileInputDefaultProps = {
  htmlAttributes: { type: "file" },
  htmlStyle: {
    display: "none",
  },
  events: {
    change: [() => {}],
  },
};

const chooseButtonDefaultProps: TchooseButtonProps = {
  events: {
    click: [
      function () {
        const { fileInput } = this.refs;
        fileInput._unwrappedElement.click();
      },
    ],
  },
};

export class FileInput extends Input {
  constructor({
    fileInputProps,
    chooseButtonProps = {},
    props = {},
    helpers,
  }: {
    fileInputProps: TFileInputProps;
    chooseButtonProps?: TchooseButtonProps;
    props?: TComponentProps;
    helpers?: TComponentHelpers;
  }) {
    const children = {} as TComponentChildren;

    const fileInput = FileInput._createFileInput(fileInputProps);
    children.fileInput = fileInput;

    children.chooseButton = FileInput._createChooseButton(
      chooseButtonProps,
      fileInput
    );

    super({ props, children, helpers });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const fileInput = this.children.fileInput as Block;
    const chooseButton = this.children.chooseButton as Block;
    chooseButton.refs.fileInput = fileInput;
  }

  private static _createFileInput(props: TFileInputProps) {
    return new Input({
      state: { fileUploadingStatus: EnumFileUploadingStatus.FileNotSelected },
      props: deepMerge(FileInputDefaultProps, props),
    });
  }

  private static _createChooseButton(
    props: TchooseButtonProps,
    fileInputRef: Input
  ) {
    return new Button({
      props: deepMerge(chooseButtonDefaultProps, props),
      refs: { fileInput: fileInputRef },
    });
  }

  protected render(): string {
    return template;
  }
}
