import { MainPage } from "core/dom";
import { NavigationPage } from "pages";
import { Button, ButtonProps } from "components/button/component";

export class HomeButton extends Button {
  constructor({
    props = { componentName: "Home Button" },
  }: { props?: ButtonProps } = {}) {
    super({
      props: {
        ...props,
        label: props.label ?? "Home",
        htmlClass: "home-button",
        events: {
          click: [
            () => {
              MainPage.component = new NavigationPage();
            },
          ],
        },
      },
    });
  }
}
