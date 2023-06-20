import { Button } from "components/buttons";
import icon from "./icon.png";

export class FunctionalButton extends Button {
  constructor() {
    super({
      props: {
        htmlClasses: ["functional-button"],
        htmlStyle: {
          "background-image": icon,
        },
        events: {
          click: [
            function () {
              this.refs.sideMenu._element.style.display = "block";
            },
          ],
        },
      },
    });
  }
}
