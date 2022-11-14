import { nanoid } from "nanoid";
import { deepEqual } from "utils/objects-handle";
import { EventBus } from "core/event-bus";

export const enum BlockCommonEvents {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export type TBlockCommonEventsHandlersArgs = {
  [BlockCommonEvents.FLOW_CDM]: [];
  [BlockCommonEvents.INIT]: [];
  [BlockCommonEvents.FLOW_CDU]: [
    Values<TComponentProps>,
    Values<TComponentProps>
  ];
  [BlockCommonEvents.FLOW_RENDER]: [];
};

export default class BlockBase {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: Nullable<HTMLElement> = null;

  protected _unwrappedElement: Nullable<HTMLElement> = null;

  protected eventBus = new EventBus<
    typeof BlockCommonEvents,
    TBlockCommonEventsHandlersArgs
  >();

  protected componentName: string;

  protected props: TComponentProps = {};

  protected helpers: Record<string, unknown>;

  readonly id: string = `${this.constructor.name}-${nanoid(7)}`;

  protected htmlWrapped: boolean;

  protected htmlWrapper?: TComponentWrapper;

  protected wrappedId?: string;

  protected _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  protected dispatchComponentDidMount(): void {
    this.eventBus.emit(BlockCommonEvents.FLOW_CDM);
  }

  protected _componentDidUpdate(
    oldPropsOrState: TComponentProps | TComponentState,
    newPropsOrState: TComponentProps | TComponentState
  ): void {
    const response = this.componentDidUpdate(oldPropsOrState, newPropsOrState);
    if (!response) {
      return;
    }

    this.eventBus.emit(BlockCommonEvents.FLOW_RENDER);
  }

  protected componentDidUpdate(
    oldPropsOrState: TComponentProps | TComponentState,
    newPropsOrState: TComponentProps | TComponentState
  ): boolean {
    const result = !deepEqual(oldPropsOrState, newPropsOrState);
    return result;
  }

  public getElement(): Nullable<HTMLElement> {
    return this._element;
  }

  public dispatchEventListener(event: string, listener: EventListener) {
    const events = this.props.events as Record<string, EventListener[]>;

    events[event] ??= [];
    events[event].push(listener);
    this._unwrappedElement!.addEventListener(event, listener);
  }

  protected _bindEventListenersToBlock() {
    const events = this.props.events as Record<string, EventListener[]>;
    if (!events) {
      return;
    }

    Object.keys(events).forEach((event) => {
      const listeners = events[event];
      events[event] = listeners.map((listener) => listener.bind(this));
    });
  }

  protected _setUnwrappedElement() {
    const element = this._element;
    if (!element) {
      throw new Error(
        `BLOCK Set Unwrapped Element: wrong element ${element} of type ${typeof element}`
      );
    }

    if (this.htmlWrapped) {
      this._unwrappedElement = element.querySelector(
        `[wrapped-id="${this.wrappedId}"]`
      ) as HTMLElement;
    } else {
      this._unwrappedElement = element;
    }
  }

  protected _addEventListenersToElement() {
    const targetElement = this._unwrappedElement;
    if (!targetElement) {
      throw new Error(
        `Incorrect element ${targetElement} of type ${typeof targetElement} to add event listeners`
      );
    }

    const events = this.props.events as Record<string, EventListener[]>;

    Object.entries(events).forEach(([event, listeners]) => {
      listeners.forEach((listener) => {
        targetElement!.addEventListener(event, listener);
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
    if (!element) {
      return;
    }

    element.style.display = "none";
  }
}
