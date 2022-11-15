import { Button, ImageInput } from "components";
import { Block } from "core/dom";
import { WithStoreButton } from "components/hocs";
import template from "./template";
import collapseButtonImage from "./collapse-button-image.png";

export class ChatsPageSideMenu extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.collapseButton = ChatsPageSideMenu._createCollapseButton();
    children.createChatButton = ChatsPageSideMenu._makeCreateChatButton();

    const { avatarChooseButton, avatarInput } =
      ChatsPageSideMenu._createAvatarChooseButton();
    children.avatarChooseButton = avatarChooseButton;
    children.avatarInput = avatarInput;

    super({ props: { htmlStyle: { display: "none" } }, children });
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    (this.children.collapseButton as Block).dispatchEventListener(
      "click",
      function () {
        this.hide();
      }.bind(this)
    );
  }

  protected render() {
    return template;
  }

  private static _createCollapseButton() {
    return new Button({
      props: {
        htmlStyle: {
          backgroundImage: collapseButtonImage,
        },
        htmlClasses: ["collapse-button"],
      },
    });
  }

  private static _makeCreateChatButton() {
    return new Button({
      props: {
        label: "create new chat",
        events: {
          click: [
            function () {
              this.refs.addChatModal.toggleModal();
            },
          ],
        },
      },
    });
  }

  private static _createAvatarChooseButton() {
    const afterRenderHook = function () {
      if (!this.store.currentChatID) {
        this._toggleDisableState();
      }
    };

    const avatarChooseButton = new WithStoreButton({
      props: {
        htmlClasses: ["avatar-choose"],
        label: "choose avatar",
      },
      helpers: {
        afterRenderHook,
      },
    });

    const avatarInput = new ImageInput({
      InputButtonRef: avatarChooseButton as any as Button,
    });

    return { avatarInput, avatarChooseButton };
  }
}
