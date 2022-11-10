import { Block } from "core/dom";
import avatarImagePlaceholder from "static/avatar-placeholder-profile.png";
import {
  Button,
  HomeButton,
  ImageComponent,
  InputForm,
  Input,
} from "components";
import { submitButtonOnClickCallback } from "components/input-form";
import { WithStore } from "components/hocs";
import template from "./template";
import {
  EnumInputFields,
  MapInputFieldToProps,
  MapInputFieldToHelpers,
} from "./form-component";
import { afterValidationCallback } from "./api-service";

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

    children.profileDataForm = new InputForm({
      props: {
        componentName: "User Profile Form",
        htmlClass: "profile-data-form",
        isSubmitButtonNeeded: false,
        afterValidationCallback,
      },
      InputClass: InputWithStore,
      enumInputFieldsNames: EnumInputFields,
      mapInputToProps: MapInputFieldToProps,
      mapInputToHelpers: MapInputFieldToHelpers,
    });

    children.homeButton = new HomeButton();

    super({ children });
  }

  protected render(): string {
    return template;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.children.changeDataButton = this._createDataChangeButton();
    this.props.userID = this.store.getUserData().id;
  }

  private _createDataChangeButton(): Button {
    const enum FormMode {
      DataSaved = "data_saved",
      DataChanging = "data_changing",
    }

    function onClickCallback() {
      const { form } = this.refs;
      console.log(`FORM: ${form.componentName}`);

      if (this.state.mode === FormMode.DataSaved) {
        form.state.apiResponseSuccess = "";
        form._render();

        this.state.mode = FormMode.DataChanging;
        this.props.label = "save data";

        Object.values(form.refs).forEach((dataField: Input) => {
          dataField.toggleDisableState();
        });
      } else {
        submitButtonOnClickCallback.call(this);
        if (form.getAPIResponseError() === "") {
          this.state.mode = FormMode.DataSaved;
          this.props.label = "change data";

          Object.values(form.refs).forEach((dataField: Input) => {
            dataField.toggleDisableState();
          });
        }
      }
    }

    return new Button({
      state: {
        mode: FormMode.DataSaved,
      },
      refs: { form: this.children.profileDataForm as Block },
      props: {
        componentName: "change/save data button",
        label: "change data",
        htmlClass: "change-data-button",
        events: {
          click: [onClickCallback],
        },
      },
    });
  }
}
