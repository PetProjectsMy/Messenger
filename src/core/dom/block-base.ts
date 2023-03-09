import { EventBus } from "core/event-bus";
import { nanoid } from "nanoid";
import { toggleHtmlClassInClassesList } from "utils/components";
import {
  deepEqual,
  getPropByPath,
  isObject,
  setPropByPath,
} from "utils/objects-handle";
import { deepCopy } from "utils/objects-handle/objects-merge";
import * as BlockTypings from "./typings";

export const enum BlockCommonEvents {
  INIT = "init",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export type TBlockCommonEventsHandlersArgs<
  TProps extends ComponentTypings.CommonProps,
  TState extends ComponentTypings.State
> = {
  [BlockCommonEvents.INIT]: [];
  [BlockCommonEvents.FLOW_CDU]:
    | [Partial<TProps>, Partial<TProps>]
    | [Partial<TState>, Partial<TState>];
  [BlockCommonEvents.FLOW_RENDER]: [];
};

export default class BlockBase<
  TProps extends ComponentTypings.CommonProps,
  TState extends ComponentTypings.State
> {
  protected _element: Nullable<HTMLElement> = null;

  protected _unwrappedElement: Nullable<HTMLElement> = null;

  protected eventBus = new EventBus<
    typeof BlockCommonEvents,
    TBlockCommonEventsHandlersArgs<TProps, TState>
  >();

  public componentName: string;

  public children: ComponentTypings.Children;

  protected props: TProps;

  protected state: TState;

  readonly id: string = `${this.constructor.name}-${nanoid(7)}`;

  protected _updateComponent({
    oldPropsOrState,
    newPropsOrState,
  }: BlockTypings.ComponentUpdateArgs<TProps, TState>) {
    if (this._hasComponentUpdated({ oldPropsOrState, newPropsOrState })) {
      this.eventBus.emit(BlockCommonEvents.FLOW_RENDER);
    }
  }

  protected _hasComponentUpdated({
    oldPropsOrState,
    newPropsOrState,
  }: BlockTypings.ComponentUpdateArgs<TProps, TState>) {
    return !deepEqual(oldPropsOrState, newPropsOrState);
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

  public dispatchEventListener(
    event: string,
    listener: ComponentTypings.EventListener
  ) {
    const events = this.props.events!;

    events[event] ??= [];
    events[event].push(listener);
    this._unwrappedElement!.addEventListener(event, listener);
  }

  public getElement(): Nullable<HTMLElement> {
    return this._element;
  }

  public getUnwrappedElement(): Nullable<HTMLElement> {
    return this._unwrappedElement;
  }

  public getStateByPath(pathString = "") {
    return getPropByPath({ object: this.state, pathString });
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
    const events = this.props.events;
    const targetElement = this._unwrappedElement;

    Object.entries(events!).forEach(([event, listeners]) => {
      listeners.forEach((listener) => {
        targetElement!.removeEventListener(event, listener);
      });
    });
  }

  protected render(): string {
    return "<div></div>";
  }

  public getPropByPath({
    pathString = "",
    isLogNeeded = false,
  }: BlockTypings.PropGetArgs = {}) {
    let value = getPropByPath({ object: this.props, pathString, isLogNeeded });
    if (isObject(value)) {
      value = deepCopy(value);
    }

    return value;
  }

  public setPropByPath({
    pathString,
    value,
    isLogNeeded = false,
  }: BlockTypings.PropSetArgs) {
    const args = {
      object: this.props,
      pathString,
      isLogNeeded,
    };

    const currentValue = getPropByPath(args);
    setPropByPath({ ...args, value });

    if (pathString.split(".").length > 1) {
      this._updateComponent({
        oldPropsOrState: currentValue,
        newPropsOrState: value,
      });
    }
  }

  public setStateByPath({
    pathString,
    value,
    isLogNeeded = false,
  }: BlockTypings.PropSetArgs) {
    const args = {
      object: this.state,
      pathString,
      isLogNeeded,
    };

    const currentValue = getPropByPath(args);
    setPropByPath({ ...args, value });

    if (pathString.split(".").length > 1) {
      this._updateComponent({
        oldPropsOrState: currentValue,
        newPropsOrState: value,
      });
    }
  }

  public setChild({
    childName,
    value,
  }: {
    childName: string;
    value: ComponentTypings.Child | ComponentTypings.ChildArray;
  }) {
    this.children[childName] = value;
  }

  public toggleHtmlClass(className: string, state: Nullable<"on" | "off">) {
    const classList = toggleHtmlClassInClassesList(
      this.props.htmlClasses!,
      className,
      state
    );

    this.setPropByPath({ pathString: "htmlClasses", value: classList });
  }
}
