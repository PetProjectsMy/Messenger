import { Block } from "core/dom";
import avatarImagePlaceholder from "static/avatar-placeholder-profile.png";
import {
  Button,
  HomeButton,
  ImageComponent,
  InputForm,
  Input,
} from "components";
import { WithStore } from "components/hocs";
import template from "./template";
import {
  EnumInputFields,
  MapInputFieldToProps,
  MapInputFieldToHelpers,
} from "./form-component";

const InputWithStore = WithStore(Input) as any;
type TProfilePageProps = WithComponentCommonProps<{ userID: number }>;
const ProfilePageBlock = WithStore(Block<TProfilePageProps>);

export class ProfilePage extends ProfilePageBlock {
  constructor() {
    const children: TComponentChildren = {};

    children.avatarImage = new ImageComponent({
      props: {
        src: avatarImagePlaceholder,
        alt: "avatar placeholder",
        componentName: "Avatar Image",
      },
    });

    const profileDataForm = new InputForm({
      props: {
        htmlClass: "profile-data-form",
      },
      helpers: {
        afterPropsAssignHook() {
          this.children.submitButton = null;
        },
      },
      InputClass: InputWithStore,
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldToProps,
      mapInputToHelpers: MapInputFieldToHelpers,
    });

    children.profileDataForm = profileDataForm;
    children.homeButton = new HomeButton();
    children.changeDataButton = new Button({
      state: {
        mode: "save",
      },
      refs: profileDataForm.refs,
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

              Object.values(this.refs).forEach((dataField: Input) => {
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

  protected _afterPropsAssignHook(): void {
    this.props.userID = this.store.getUserData().id;
  }
}
