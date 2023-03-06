import { HomeButton } from "components/buttons/home-button";
import { type ImageComponent } from "components/image";
import { Input } from "components/inputs";
import { Block } from "core/dom";
import { WithStore } from "hocs";
import {
  DataChangeButton,
  ProfileHeader,
  ProfilePageInputForm,
} from "./components";
import { AvatarUploadForm } from "./components/avatar-upload-form";
import { EnumInputFields } from "./components/data-form";
import { MapInputFieldToUserDataRecord } from "./components/data-form/fields";
import template from "./template";

type TProfilePageProps = ComponentTypings.WithCommonProps<{ userID: number }>;
const ProfilePageBlock = WithStore(Block<TProfilePageProps>);

export class ProfilePage extends ProfilePageBlock {
  constructor() {
    const children: ComponentTypings.Children = {};

    const header = new ProfileHeader();
    const avatarImage = header.getChildByPath<ImageComponent>("avatarImage");

    children.header = header;
    children.profileDataForm = new ProfilePageInputForm();
    children.avatarUploadForm = new AvatarUploadForm();
    children.homeButton = new HomeButton();

    super({ children, refs: { avatarImage } });
  }

  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.children.changeDataButton = new DataChangeButton({
      form: this.children.profileDataForm as Block,
    });
  }

  public updateUserInfo() {
    const userData = this.store.getUserDataByPath() as StoreTypings.UserData;

    Object.entries((this.children.profileDataForm as Block).refs).forEach(
      ([inputName, inputBlock]: [EnumInputFields, Input]) => {
        const recordName = MapInputFieldToUserDataRecord[inputName];
        inputBlock.setPropByPath(
          "htmlAttributes.value",
          `${userData[recordName]}`
        );
      }
    );
  }

  public updateUserAvatar() {
    const newAvatar = this.store.getUserDataByPath("avatar") as string;
    (this.refs.avatarImage as ImageComponent).setPropByPath(
      "htmlAttributes.src",
      newAvatar
    );
  }
}
