import { nanoid } from "nanoid";
import propsAreEqual from "utils/object-compare";
import EventBus from "./event-bus";

export default class BlockBase {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: HTMLElement | null = null;

  protected eventBus: EventBus = new EventBus();

  protected props: ComponentProps;

  readonly id: string = nanoid(7);

  protected componentName: string;

  protected _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  protected dispatchComponentDidMount(): void {
    this.eventBus.emit(BlockBase.EVENTS.FLOW_CDM);
  }

  protected _componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this.eventBus.emit(BlockBase.EVENTS.FLOW_RENDER);
    this._addEvents();
  }

  protected componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): boolean {
    return !propsAreEqual(oldProps, newProps);
  }

  protected setProps(nextProps: ComponentProps): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  public getElement(): Nullable<HTMLElement> {
    return this._element;
  }

  protected _addEvents(): void {
    const { events } = this.props;
    const element = this.getElement();

    if (!BlockBase.isHTMLElement(element)) {
      throw new Error(
        `Wrong element ${element} of type ${typeof element} to add event listeners`
      );
    }
    if (!events) {
      return;
    }

    Object.entries(events).forEach(
      ([event, listener]: [string, EventListener]) => {
        element!.addEventListener(event, listener);
      }
    );
  }

  protected _removeEvents(): void {
    const { events } = this.props;
    const element = this._element;

    if (!BlockBase.isHTMLElement(element)) {
      throw new Error(
        `Wrong element ${element} of type ${typeof element} to remove event listeners`
      );
    }
    if (!events) {
      return;
    }

    Object.entries(events).forEach(
      ([event, listener]: [string, EventListener]) => {
        element!.removeEventListener(event, listener);
      }
    );
  }

  protected _makePropsProxy(props: ComponentProps) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldValue = target[prop];

        target[prop] = value;
        self.eventBus.emit(BlockBase.EVENTS.FLOW_CDU, oldValue, value);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  protected static _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public static isHTMLElement(element: any) {
    return element instanceof HTMLElement;
  }

  public show(): void {
    const element = this.getElement();

    if (!BlockBase.isHTMLElement(element)) {
      throw new Error(
        `Wrong element ${element} of type ${typeof element} to show`
      );
    }

    element!.style.display = "block";
  }

  public hide(): void {
    const element = this.getElement();

    if (!BlockBase.isHTMLElement(element)) {
      throw new Error(
        `Wrong element ${element} of type ${typeof element} to hide`
      );
    }

    if (!BlockBase.isHTMLElement(element)) {
      element!.style.display = "none";
    }
  }
}
