import { Button, TButtonProps } from "components/buttons";
import { WithRouter } from "components/hocs";
import { AuthorizationService } from "services";

export class LogoutButton extends WithRouter(Button) {
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
