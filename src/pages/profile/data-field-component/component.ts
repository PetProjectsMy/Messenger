import { Block } from "core/dom";
import { Input } from "components";
import template from "./template";

type DataFieldProps = WithCommonProps<{
  dataType: string;
  inputPlaceholder: string;
}>;

export class DataField extends Block<DataFieldProps> {
  constructor(props: DataFieldProps) {
    const children: ComponentChildren = {};

    const { inputPlaceholder } = props;
    children.dataInput = new Input({
      props: {
        value: inputPlaceholder,
        htmlClass: "data-input",
        disabledAttr: true,
      },
    });

    super({ props, children });
  }

  protected render(): string {
    return template;
  }

  public toggleDisableState() {
    (this.children.dataInput as Input).toggleDisableState();
  }
}
