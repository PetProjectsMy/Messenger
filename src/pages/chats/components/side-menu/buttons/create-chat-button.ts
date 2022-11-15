import { Button } from "components";

export class CreateChatButton extends Button {
  constructor() {
    super({
      props: {
        label: "create new chat",
        events: {
          click: [
            function () {
              this.refs.addChatModal.toggleModal();
            },
          ],
        },
      },
    });
  }
}
