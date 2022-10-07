import { MainPage } from "core/renderDOM";
import { NavigationPage } from "pages";
import { Button, ButtonProps } from "components/button/component";

export class HomeButton extends Button {
  constructor({ props = {} }: { props?: ButtonProps } = {}) {
    super({
      props: {
        ...props,
        label: props.label ?? "Home",
        htmlClass: "home-button",
        events: {
          click: () => {
            MainPage.component = new NavigationPage();
          },
        },
      },
    });
  }
}
