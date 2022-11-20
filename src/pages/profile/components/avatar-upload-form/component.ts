import { Block } from "core/dom";
import { type ImageComponent } from "components";
import { SubmitSection } from "./submit-section";
import { AvatarInput } from "./avatar-input";
import template from "./template";

export class AvatarUploadForm extends Block {
  constructor(profilePageImageRef: ImageComponent) {
    super({
      refs: { profileImage: profilePageImageRef },
      state: { uploadingStatus: "" },
    });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const avatarInput = this._createAvatarInput();
    this.children.avatarInput = avatarInput;

    const submitSection = this._createAvatarSubmitSection();
    this.children.submitSection = submitSection;

    const avatarFileInput = avatarInput.getChildByPath("fileInput");
    avatarFileInput.refs.avatarSubmit = submitSection;

    const submitButton = submitSection.getChildByPath("submitButton");
    Object.assign(submitButton.refs, {
      avatarInput,
    });
  }

  protected render() {
    return template;
  }

  private _createAvatarInput() {
    return new AvatarInput();
  }

  private _createAvatarSubmitSection() {
    return new SubmitSection();
  }
}
