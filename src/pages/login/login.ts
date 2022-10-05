import template from "./login.hbs";
import Button from "../../components";
import Block from "../../components/core/block";

export default class LoginPage extends Block {
  render(): DocumentFragment {
    return this.compile(template, {});
  }

  initChildren() {
    this.children.button = new Button({
      label: "Click me",
      events: {
        click: () => {
          console.log("click");
        },
      },
    });
  }
}
