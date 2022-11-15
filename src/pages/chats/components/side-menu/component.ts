import { Block } from "core/dom";

import {
  CollapseButton,
  CreateChatButton,
  AvatarChooseButton,
} from "./buttons";
import template from "./template";

export class ChatsPageSideMenu extends Block {
  constructor() {
    const children = {} as TComponentChildren;

    children.collapseButton = new CollapseButton();
    children.createChatButton = new CreateChatButton();
    children.avatarChooseButton = new AvatarChooseButton();

    super({ props: { htmlStyle: { display: "none" } }, children });
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    (this.children.collapseButton as Block).refs.sideMenu = this;
  }

  protected render() {
    return template;
  }
}
