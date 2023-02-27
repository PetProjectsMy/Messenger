import { Block } from "core/dom";
import { deepMerge } from "utils/objects-handle";
import { Input, TInputProps } from "components/inputs";
import { Button, TButtonProps } from "components/buttons";
import template from "./template";

export const enum EnumFileUploadingStatus {
  FileNotSelected = "File not selected",
  FileSelected = "File selected",
  FileUploaded = "File uploaded",
}

type TFileInputProps = TInputProps & {
  htmlAttributes: { name: string; type?: "file"; accept?: string };
  events?: {
    change: ComponentTypings.EventListener[];
  };
};

type TChooseButtonProps = TButtonProps & {
  events?: {
    click?: ComponentTypings.EventListener[];
  };
};

export class FileInput extends Block {
  constructor({
    fileInputProps,
    chooseButtonProps = {},
    props = {},
    helpers,
  }: {
    fileInputProps: TFileInputProps;
    chooseButtonProps?: TChooseButtonProps;
    props?: ComponentTypings.CommonProps;
    helpers?: ComponentTypings.Helpers;
  }) {
    const children = {} as ComponentTypings.Children;

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

    fileInput.refs.form = this;
    chooseButton.refs.fileInput = fileInput;
  }

  private static _createFileInput(props: TFileInputProps) {
    const FileInputDefaultProps = {
      htmlAttributes: { type: "file", accept: "image/*" },
      htmlStyle: {
        display: "none",
      },
      events: {
        change: [() => {}],
      },
    };

    return new Input({
      state: { fileUploadingStatus: EnumFileUploadingStatus.FileNotSelected },
      props: deepMerge(FileInputDefaultProps, props),
    });
  }

  private static _createChooseButton(
    props: TChooseButtonProps,
    fileInputRef: Input
  ) {
    const chooseButtonDefaultProps: TChooseButtonProps = {
      events: {
        click: [
          function () {
            const { fileInput } = this.refs;
            fileInput._unwrappedElement.click();
          },
        ],
      },
    };

    return new Button({
      props: deepMerge(chooseButtonDefaultProps, props),
      refs: { fileInput: fileInputRef },
    });
  }

  protected render(): string {
    return template;
  }
}
