import { Button } from "components/buttons";
import collapseButtonImage from "./collapse-button-image.png";

export class CollapseButton extends Button {
  constructor() {
    super({
      props: {
        htmlStyle: {
          "background-image": collapseButtonImage,
        },
        htmlClasses: ["collapse-button"],
        events: {
          click: [
            function () {
              this.refs.sideMenu.hide();
            },
          ],
        },
      },
    });
  }
}
