import { WithStoreImageComponent } from "hocs/components";
import avatarPlacholder from "./avatar-placeholder.svg";

export class ChatAvatar extends WithStoreImageComponent {
  private chatID: string;

  constructor(chatID: string) {
    const beforePropsAssignHook = function () {
      this.chatID = chatID;
    };

    super({ helpers: { beforePropsAssignHook } });
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    const avatarSrc =
      this.store!.getChatsDataByPath(`${this.chatID}.avatar`) ??
      avatarPlacholder;

    Object.assign(this.props, {
      htmlAttributes: {
        src: avatarSrc,
        alt: "avatar placeholder",
      },
    });
  }
}
