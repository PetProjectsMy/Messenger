import { Block } from "core/dom";
import avatarImagePlaceholder from "static/avatar-placeholder-profile.png";
import { Button, HomeButton, ImageComponent } from "components";
import { DataField } from "./data-field-component/component";
import template from "./template";

export class ProfilePage extends Block {
  constructor() {
    const children: TComponentChildren = {};

    children.avatarImage = new ImageComponent({
      props: {
        src: avatarImagePlaceholder,
        alt: "avatar placeholder",
        componentName: "Avatar Image",
      },
    });

    const changeButtonRefs: TComponentRefs = {};
    children.profileDataFields = [];
    [
      ["email", "email", "email@example.com"],
      ["login", "login", "ExampleLogin"],
      ["first name", "first_name", "Name"],
      ["second name", "second_name", "Surname"],
      ["chat nickname", "display_name", "Chat Nickname"],
      ["phone", "phone", "8 (777) 888 77 88"],
    ].forEach(([dataType, htmlName, inputPlaceholder]) => {
      const dataField: DataField = new DataField({
        componentName: `${dataType} field`,
        htmlName,
        inputPlaceholder,
        dataType,
      });
      (children.profileDataFields as DataField[]).push(dataField);

      changeButtonRefs[htmlName] = dataField;
    });

    children.homeButton = new HomeButton();

    children.changeDataButton = new Button({
      state: {
        mode: "save",
      },
      refs: changeButtonRefs,
      props: {
        componentName: "change/save data button",
        label: "change data",
        htmlClass: "change-data-button",
        events: {
          click: [
            function changeMode() {
              if (this.state.mode === "save") {
                this.props.label = "save data";
                this.state.mode = "change";
              } else {
                this.props.label = "change data";
                this.state.mode = "save";
              }

              Object.values(this.refs).forEach((dataField: DataField) => {
                dataField.toggleDisableState();
              });
            },
          ],
        },
      },
    });

    super({ children });
  }

  protected render(): string {
    return template;
  }
}
