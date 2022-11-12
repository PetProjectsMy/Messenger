import { Block } from "core/dom";
import template from "./template";

export type TInputProps = WithComponentCommonProps<{
  value?: string;
  placeholder?: string;
  type?: string;
  accept?: string;
  disabledAttr?: boolean;
}>;

export class Input extends Block<TInputProps> {
  protected render(): string {
    return template;
  }

  public getValue() {
    let element = this._element;
    if (this.htmlWrapped) {
      try {
        element = (element as HTMLElement).querySelector("input");
      } catch {
        if (!(element instanceof HTMLElement)) {
          throw new Error(
            `${
              this.componentName
            }: wrong element ${element} of type ${typeof element} to validate input`
          );
        }
      }
    }

    return (element as HTMLInputElement).value;
  }

  protected _afterPropsAssignHook(): void {
    super._afterPropsAssignHook();

    this.props.value ??= "";
  }

  public setValue(value: string) {
    this.props.value = value;
  }

  public toggleDisableState() {
    this.props.disabledAttr = !this.props.disabledAttr;
  }
}
