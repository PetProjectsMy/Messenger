import { WithStoreBlock } from "hocs/components";
import { ImageComponent } from "components/image";
import avatarPlaceholder from "./avatar-placeholder.png";
import template from "./template";

type TProfileHeaderProps = WithComponentCommonProps<{ userID: string }>;

export class ProfileHeader extends (WithStoreBlock as any as BlockClass<TProfileHeaderProps>) {
  protected _afterPropsAssignHook(): void {
    const userID = this.store!.getUserID();
    this.props.userID = userID;

    this._createAvatarImage();
  }

  private _createAvatarImage() {
    const storeAvatar = this.store!.getUserDataByPath("avatar");
    const imageSource = storeAvatar || avatarPlaceholder;
    const avatarImage = new ImageComponent({
      props: {
        htmlAttributes: {
          src: imageSource,
          alt: "Profile Avatar",
        },
      },
    });

    this.children.avatarImage = avatarImage;
  }

  protected render(): string {
    return template;
  }
}
