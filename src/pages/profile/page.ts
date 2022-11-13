import { Block } from "core/dom";
import avatarImagePlaceholder from "static/avatar-placeholder-profile.png";
import { HomeButton, ImageComponent, Input } from "components";
import { WithStore } from "components/hocs";
import type { EventBus } from "core/event-bus";
import template from "./template";
import { DataChangeButton, ProfilePageInputForm } from "./components";
import { EnumInputFields } from "./components/data-form";
import { MapInputFieldToUserDataRecord } from "./components/data-form/fields";
import { AvatarUploadForm } from "./components/avatar-upload-form";

type TProfilePageProps = WithComponentCommonProps<{ userID: number }>;
const ProfilePageBlock = WithStore(Block<TProfilePageProps>);

const enum EnumProfilePageEvents {
  UserDidUpdate = "events: user data did update",
  AvatarDidUpdate = "events: user avatar did update",
}

type ProfilePageEventsHandlersArgs = {
  [EnumProfilePageEvents.UserDidUpdate]: [];
  [EnumProfilePageEvents.AvatarDidUpdate]: [];
};

export class ProfilePage extends ProfilePageBlock {
  protected eventBus: EventBus<
    WithCommonEvents<typeof EnumProfilePageEvents>,
    WithCommonHandlersArgs<ProfilePageEventsHandlersArgs>
  >;

  constructor() {
    const children: TComponentChildren = {};

    const storeAvatar = window.store.getUserData("avatar");
    const imageSource = storeAvatar || avatarImagePlaceholder;
    const avatarImage = new ImageComponent({
      props: {
        src: imageSource,
        alt: "avatar placeholder",
        componentName: "Avatar Image",
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
    this.props.userID = this.store.getUserData("id") as number;
  }

  protected _beforeRegisterEventsHook() {
    super._beforeRegisterEventsHook();

    this.eventBus.on(
      EnumProfilePageEvents.UserDidUpdate,
      this._updateUserInfo.bind(this)
    );

    this.eventBus.on(
      EnumProfilePageEvents.AvatarDidUpdate,
      this._updateUserAvatar.bind(this)
    );
  }

  userDidUpdate() {
    this.eventBus.emit(EnumProfilePageEvents.UserDidUpdate);
  }

  avatarDidUpdate() {
    this.eventBus.emit(EnumProfilePageEvents.AvatarDidUpdate);
  }

  private _updateUserInfo() {
    const userData = this.store.getUserData() as TAppUserData;

    Object.entries((this.children.profileDataForm as Block).refs).forEach(
      ([inputName, inputBlock]: [EnumInputFields, Input]) => {
        const recordName = MapInputFieldToUserDataRecord[inputName];
        inputBlock.setProps({ value: `${userData[recordName]}` });
      }
    );
  }

  private _updateUserAvatar() {
    const newAvatar = this.store.getUserData("avatar") as string;
    (this.children.avatarImage as ImageComponent).setProps({ src: newAvatar });
  }
}
