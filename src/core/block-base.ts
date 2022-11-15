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

  protected _element: Nullable<HTMLElement> = null;

  protected eventBus: EventBus = new EventBus();

  protected props: ComponentProps = {};

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
    const result = !propsAreEqual(oldProps, newProps);
    return result;
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

  protected _bindEventListeners() {
    const events = this.props.events as Record<string, EventListener[]>;
    if (!events) {
      return;
    }

    Object.keys(events).forEach((event) => {
      const listeners = events[event];
      events[event] = listeners.map((listener) => listener.bind(this));
    });
  }

  protected _addEvents(targetElement: Nullable<HTMLElement> = null): void {
    const element = targetElement ?? this.getElement();
    if (!BlockBase.isHTMLElement(element)) {
      throw new Error(
        `${
          this.componentName
        }: wrong element ${element} of type ${typeof element} to add event listeners`
      );
    }

    const events = this.props.events as Record<string, EventListener[]>;

    Object.entries(events).forEach(([event, listeners]) => {
      listeners.forEach((listener) => {
        element!.addEventListener(event, listener);
      });
    });
  }

  protected _removeEvents(targetElement: Nullable<HTMLElement> = null): void {
    const element = targetElement ?? this.getElement();
    if (!BlockBase.isHTMLElement(element)) {
      throw new Error(
        `${
          this.componentName
        }: wrong element ${element} of type ${typeof element} to remove event listeners`
      );
    }

    const events = this.props.events as Record<string, EventListener[]>;

    Object.entries(events).forEach(([event, listeners]) => {
      listeners.forEach((listener) => {
        element!.removeEventListener(event, listener);
      });
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
