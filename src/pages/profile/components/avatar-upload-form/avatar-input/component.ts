import { FileInput } from "components";
import { EnumFileUploadingStatus } from "components/inputs/file-input";

export class AvatarInput extends FileInput {
  constructor() {
    const onFileChangeCallback = function () {
      const fileInput = this._unwrappedElement;
      const submitState = this.refs.avatarSubmit.state;

      console.log(`FILE CHANGE`, fileInput.value);
      if (!fileInput.value) {
        submitState.uploadingStatus = EnumFileUploadingStatus.FileNotSelected;
      } else {
        submitState.uploadingStatus = EnumFileUploadingStatus.FileSelected;
      }
    };

    super({
      props: { htmlClasses: ["upload-avatar"] },
      inputButtonProps: {
        label: "upload avatar",
        htmlClasses: ["choose-avatar"],
      },
      fileInputProps: {
        htmlAttributes: {
          name: "avatar",
        },
        events: {
          change: [onFileChangeCallback],
        },
      },
    });
  }
}
