import { type Block } from "core/dom";
import { deepMerge } from "utils/objects-handle";
import { Input } from "components/inputs";
import { TInputProps } from "components/inputs/basic-input";
import { type Button } from "components/buttons";

const enum EnumFileUploadingStatus {
  FileNotSelected = "File not selected",
  FileSelected = "File selected",
  FileUploaded = "File uploaded",
}

export type TBasucFileInputProps = TInputProps & {
  htmlAttributes?: { type?: "file"; accept?: string };
};
export const BasicFileInputDefaultProps: TBasucFileInputProps = {
  htmlAttributes: { type: "file" },
  htmlStyle: {
    display: "none",
  },
  events: {
    change: [() => {}],
  },
};

export function getFileInputClass<
  Tprops extends TBasucFileInputProps = TBasucFileInputProps
>(defaultProps: Tprops) {
  class FileInput extends Input {
    constructor({
      InputButtonRef,
      props = {} as Tprops,
    }: {
      InputButtonRef: Button;
      props?: Tprops;
    }) {
      super({
        refs: {
          inputButton: InputButtonRef,
        },
        state: { fileUploadingStatus: EnumFileUploadingStatus.FileNotSelected },
        props: deepMerge(defaultProps, props),
      });
    }

    protected _afterPropsAssignHook(): void {
      super._afterPropsAssignHook();

      const inputButton = this.refs.inputButton as Block;
      inputButton.dispatchEventListener(
        "click",
        function () {
          console.log(`INPUT BUTTON CLICK: ${this.componentName}`);
          this._unwrappedElement.click();
        }.bind(this)
      );
    }
  }

  return FileInput;
}

export const FileInput = getFileInputClass(BasicFileInputDefaultProps);
