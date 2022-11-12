import { Block } from "core/dom";
import avatarImagePlaceholder from "static/avatar-placeholder-profile.png";
import { HomeButton, ImageComponent, Input } from "components";
import { WithStore } from "components/hocs";
import type { EventBus } from "core/event-bus";
import template from "./template";
import { DataChangeButton, ProfilePageInputForm } from "./components";
import {
  EnumInputFields,
  MapInputFieldToUserDataRecord,
} from "./components/data-form";
import { AvatarUploadForm } from "./components/avatar-upload-form";

type TProfilePageProps = WithComponentCommonProps<{ userID: number }>;
const ProfilePageBlock = WithStore(Block<TProfilePageProps>);

const enum EnumProfilePageEvents {
  UserDidUpdate = "events: user data did update",
}

type ProfilePageEventsHandlersArgs = {
  [EnumProfilePageEvents.UserDidUpdate]: [];
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

    super({ children });
  }

  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.children.changeDataButton = new DataChangeButton({
      form: this.children.profileDataForm as Block,
      page: this,
    });
    this.props.userID = (this.store.getUserData() as TAppStateUserData).id;
  }

  protected _beforeRegisterEventsHook() {
    super._beforeRegisterEventsHook();

    this.eventBus.on(
      EnumProfilePageEvents.UserDidUpdate,
      this._updateUserInfo.bind(this)
    );
  }

  userDidUpdate() {
    this.eventBus.emit(EnumProfilePageEvents.UserDidUpdate);
  }

  private _updateUserInfo() {
    const userData = this.store.getUserData() as TAppStateUserData;

    Object.entries((this.children.profileDataForm as Block).refs).forEach(
      ([inputName, inputBlock]: [EnumInputFields, Input]) => {
        const recordName = MapInputFieldToUserDataRecord[inputName];
        inputBlock.setValue(`${userData[recordName]}`);
      }
    );
  }
}
