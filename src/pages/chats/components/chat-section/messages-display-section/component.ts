import { Block } from "core/dom";
import { WithStore } from "components/hocs";
import template from "./template";

export class MessagesDisplayArea extends WithStore(Block) {
  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this.state.userHasAnyChats = Boolean(this.store.userHasAnyChats());
  }

  protected render() {
    return template;
  }
}
