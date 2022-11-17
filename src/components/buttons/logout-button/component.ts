import { TButtonProps } from "components/buttons";
import { WithRouterButton } from "hocs/components";
import { AuthorizationService } from "services";

export class LogoutButton extends WithRouterButton {
  constructor(props?: TButtonProps) {
    super({
      props: {
        label: "Logout",
        htmlClasses: ["logout-button"],
        events: {
          click: [
            () => {
              AuthorizationService.logout();
            },
          ],
        },
        ...props,
      },
    });
  }
}
