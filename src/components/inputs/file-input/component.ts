import { type Block } from "core/dom";
import { deepMerge } from "utils/objects-handle";
import { Input, TInputProps } from "../basic-input";

const enum EnumFileUploadingStatus {
  FileNotSelected = "File not selected",
  FileSelected = "File selected",
  FileUploaded = "File uploaded",
}

type TFileInputProps = TInputProps & { htmlAttributes?: { accept?: string } };

const ExtendedInput = Input as typeof Block<TFileInputProps>;
export class FileInput extends ExtendedInput {
  constructor({
    props,
    InputButtonRef,
    onFileChangeCallback = () => {},
  }: {
    props: TFileInputProps;
    InputButtonRef: Block;
    onFileChangeCallback?: () => void;
  }) {
    const defaultProps = {
      htmlAttributes: { type: "file" },
      events: {
        change: [onFileChangeCallback],
      },
    };

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
