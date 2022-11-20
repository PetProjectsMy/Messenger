import { nanoid } from "nanoid";
import {
  deepEqual,
  getPropByPath,
  setPropByPath,
  comparePropByPath,
} from "utils/objects-handle";
import { EventBus } from "core/event-bus";
import { toggleHtmlClassToList } from "utils/components";

export const enum BlockCommonEvents {
  INIT = "init",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export type TBlockCommonEventsHandlersArgs<
  TProps extends TComponentCommonProps,
  TState extends TComponentState
> = {
  [BlockCommonEvents.INIT]: [];
  [BlockCommonEvents.FLOW_CDU]:
    | [Partial<TProps>, Partial<TProps>]
    | [Partial<TState>, Partial<TState>];
  [BlockCommonEvents.FLOW_RENDER]: [];
};

export default class BlockBase<
  TProps extends TComponentCommonProps,
  TState extends TComponentState
> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: Nullable<HTMLElement> = null;

  protected _unwrappedElement: Nullable<HTMLElement> = null;

  protected eventBus = new EventBus<
    typeof BlockCommonEvents,
    TBlockCommonEventsHandlersArgs<TProps, TState>
  >();

  public componentName: string;

  protected children: TComponentChildren;

  protected props: TProps;

  protected state: TState;

  readonly id: string = `${this.constructor.name}-${nanoid(7)}`;

  protected _componentDidUpdate(
    oldPropsOrState: Partial<TProps> | Partial<TState>,
    newPropsOrState: Partial<TProps> | Partial<TState>,
    forceUpdate: boolean = false
  ): void {
    if (
      forceUpdate ||
      this.componentDidUpdate(oldPropsOrState, newPropsOrState)
    ) {
      this.eventBus.emit(BlockCommonEvents.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(
    oldPropsOrState: Partial<TProps> | Partial<TState>,
    newPropsOrState: Partial<TProps> | Partial<TState>
  ): boolean {
    const result = !deepEqual(oldPropsOrState, newPropsOrState);
    return result;
  }

  protected _addEventListenersToElement() {
    const targetElement = this._unwrappedElement!;

    const events = this.props.events!;

    Object.entries(events).forEach(([event, listeners]) => {
      listeners.forEach((listener) => {
        targetElement.addEventListener(event, listener);
      });
    });
  }

  protected _bindEventListenersToBlock() {
    const events = this.props.events!;

    Object.keys(events).forEach((event) => {
      const listeners = events[event];
      events[event] = listeners.map((listener) => listener.bind(this));
    });
  }

  public dispatchEventListener(event: string, listener: TEventListener) {
    const events = this.props.events!;

    events[event] ??= [];
    events[event].push(listener);
    this._unwrappedElement!.addEventListener(event, listener);
  }

  public getElement(): Nullable<HTMLElement> {
    return this._element;
  }

  public getStateByPath(pathString: string = "") {
    return getPropByPath(this.state, pathString);
  }

  public hide(): void {
    const element = this.getElement();
    if (!element) {
      return;
    }

    element.style.display = "none";
  }

  public show(): void {
    const element = this.getElement();

    element!.style.display = "block";
  }

  protected _removeEventsFromElement() {
    const targetElement = this._unwrappedElement!;

    const events = this.props.events!;

    Object.entries(events).forEach(([event, listeners]) => {
      listeners.forEach((listener) => {
        targetElement.removeEventListener(event, listener);
      });
    });
  }

  protected render(): string {
    return "<div></div>";
  }

  public setPropByPath(
    propPath: string,
    newValue: unknown,
    forceUpdate: boolean = false,
    doLog: boolean = false
  ): void {
    const didUpdate =
      forceUpdate || !comparePropByPath(this.props, propPath, newValue, doLog);

    if (didUpdate) {
      setPropByPath(this.props, propPath, newValue, doLog);
      this._componentDidUpdate("" as any, "" as any, true);
    }
  }

  public setChildByPath(
    childPath: string,
    newValue: TComponentChild | TComponentChildArray,
    forceUpdate: boolean = false,
    doLog: boolean = false
  ) {
    const didUpdate =
      forceUpdate ||
      !comparePropByPath(this.children, childPath, newValue, doLog);

    if (didUpdate) {
      setPropByPath(this.children, childPath, newValue, doLog);
      this._componentDidUpdate("" as any, "" as any, true);
    }
  }

  public toggleHtmlClass(className: string, state: Nullable<"on" | "off">) {
    const classList = toggleHtmlClassToList(
      this.props.htmlClasses!,
      className,
      state
    );

    this.props.htmlClasses = classList;
  }
}
