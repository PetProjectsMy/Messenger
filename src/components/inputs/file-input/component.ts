import { type Block } from "core/dom";
import { Input, TInputProps } from "../basic-input";

const enum EnumFileUploadingStatus {
  FileNotSelected = "File not selected",
  FileSelected = "File selected",
  FileUploaded = "File uploaded",
}

export class FileInput extends Input {
  constructor({
    props,
    InputButtonRef,
    onFileChangeCallback = () => {},
  }: {
    props: TInputProps;
    InputButtonRef: Block;
    onFileChangeCallback?: () => void;
  }) {
    super({
      refs: {
        inputButton: InputButtonRef,
      },
      state: { fileUploadingStatus: EnumFileUploadingStatus.FileNotSelected },
      props: {
        type: "file",
        events: {
          change: [onFileChangeCallback],
        },
        ...props,
      },
    });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const inputButton = this.refs.inputButton as Block;
    inputButton.dispatchEventListener(
      "click",
      function () {
        this._element.click();
      }.bind(this)
    );
  }
}
