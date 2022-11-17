import { Block } from "core/dom";
import avatarImagePlaceholder from "static/avatar-placeholder-profile.png";
import { ImageComponent, Input } from "components";
import { HomeButton } from "components/buttons";
import { WithStore } from "hocs";
import template from "./template";
import { DataChangeButton, ProfilePageInputForm } from "./components";
import { EnumInputFields } from "./components/data-form";
import { MapInputFieldToUserDataRecord } from "./components/data-form/fields";
import { AvatarUploadForm } from "./components/avatar-upload-form";

type TProfilePageProps = WithComponentCommonProps<{ userID: number }>;
const ProfilePageBlock = WithStore(Block<TProfilePageProps>);

export class ProfilePage extends ProfilePageBlock {
  constructor() {
    const children: TComponentChildren = {};

    const storeAvatar = window.store.getUserDataByPath("avatar");
    const imageSource = storeAvatar || avatarImagePlaceholder;
    const avatarImage = new ImageComponent({
      props: {
        htmlAttributes: {
          src: imageSource,
          alt: "Profile Avatar",
        },
      },
    });
    children.avatarImage = avatarImage;
    children.avatarUploadForm = new AvatarUploadForm(avatarImage);

    children.profileDataForm = new ProfilePageInputForm();
    children.homeButton = new HomeButton();

    const refs = {} as TComponentRefs;

    super({ children, refs });
  }

  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.children.changeDataButton = new DataChangeButton({
      form: this.children.profileDataForm as Block,
    });
    this.props.userID = this.store.getUserDataByPath("id") as number;
  }

  public updateUserInfo() {
    const userData = this.store.getUserDataByPath() as TAppUserData;

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
    (this.children.avatarImage as ImageComponent).setPropByPath(
      "htmlAttributes.src",
      newAvatar
    );
  }
}
