import { Button } from "components";
import backgorundImage from "./icon.png";

export class AttachmentButton extends Button {
  constructor() {
    super({
      props: {
        htmlClasses: ["attachment-button"],
        htmlStyle: {
          "background-image": backgorundImage,
        },
      },
    });
  }
}
