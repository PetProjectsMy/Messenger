import { TButtonProps } from "components/buttons";
import { EnumAppRoutes } from "core/router";
import { WithRouterButton } from "hocs/components";

export class HomeButton extends WithRouterButton {
  constructor(props?: TButtonProps) {
    super({
      props: {
        label: "Home",
        htmlClasses: ["home-button"],
        events: {
          click: [
            () => {
              this.router?.go(EnumAppRoutes.NavigationPage);
            },
          ],
        },
        ...props,
      },
    });
  }
}
