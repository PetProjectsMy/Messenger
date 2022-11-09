import { EnumAppRoutes } from "core/router";
import { Button, TButtonProps } from "components/buttons";
import { WithRouter } from "components/hocs";

export class HomeButton extends WithRouter(Button) {
  constructor(props?: TButtonProps) {
    super({
      props: {
        label: "Home",
        htmlClass: "home-button",
        events: {
          click: [
            () => {
              this.router.go(EnumAppRoutes.NavigationPage);
            },
          ],
        },
        ...props,
      },
    });
  }
}
