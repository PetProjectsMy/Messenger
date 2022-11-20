import Handlebars from "handlebars";
import { nanoid } from "nanoid";
import { deepMerge } from "utils/objects-handle";
import { type Store } from "core/store";
import { type PathRouter } from "core/router";
import { getDescendantByPath } from "utils/pages/get-descendant-by-path";
import BlockBase, { BlockCommonEvents } from "./block-base";

export class Block<
  TProps extends TComponentCommonProps = TComponentCommonProps,
  TState extends TComponentState = TComponentState
> extends BlockBase<TProps, TState> {
  protected helpers: TComponentHelpers;

  private htmlWrapped: boolean;

  protected props: TProps;

  public refs: TComponentRefs;

  public router?: PathRouter;

  public store?: Store;

  private wasRendered: Boolean = false;

  protected wrappedId?: string;

  constructor({
    componentName,
    props = {} as TProps,
    children = {},
    refs = {},
    state = {},
    helpers = {},
  }: {
    componentName?: string;
    props?: TProps;
    children?: TComponentChildren;
    refs?: TComponentRefs;
    state?: TComponentState;
    helpers?: TComponentHelpers;
  } = {}) {
    super();

    this.helpers = helpers;

    this._beforePropsAssignHook();
    this.componentName =
      componentName ?? `Not Named Block of type ${this.constructor.name}`;

    this.props = deepMerge(this.props ?? {}, props) as TProps;
    this.props.events = this.props.events ?? {};
    this.props.htmlAttributes ??= {};
    this.props.htmlClasses ??= [];
    this.props.htmlStyle ??= {};

    this.children = children;
    this.refs = refs;
    this.state = state as TState;

    this._afterPropsAssignHook();
    this.htmlWrapped = !!this.props.htmlWrapper;
    if (this.htmlWrapped) {
      this.wrappedId = nanoid(5);
    }

    this._beforePropsProxyHook();
    this.props = this._makeProxy(this.props) as TProps;
    this.state = this._makeProxy(this.state) as TState;
    this.children = this._makeProxy(this.children);

    this._beforeRegisterEventsHook();
    this._registerEvents();

    this._beforeRenderHook();
    this.eventBus.emit(BlockCommonEvents.INIT);
    this._afterRenderHook();
  }

  protected _afterPropsAssignHook() {
    if (this.helpers.afterPropsAssignHook) {
      (this.helpers.afterPropsAssignHook as Function).call(this);
    }
  }

  protected _afterRenderHook() {
    if (this.helpers.afterRenderHook) {
      (this.helpers.afterRenderHook as Function).call(this);
    }
  }

  protected _beforePropsAssignHook() {
    if (this.helpers.beforePropsAssignHook) {
      (this.helpers.beforePropsAssignHook as Function).call(this);
    }
  }

  protected _beforePropsProxyHook() {
    this._bindEventListenersToBlock();

    if (this.helpers.beforePropsProxyHook) {
      (this.helpers.beforePropsProxyHook as Function).call(this);
    }
  }

  protected _beforeRegisterEventsHook() {}

  protected _beforeRenderHook() {}

  private _compile(): DocumentFragment {
    const fragment = document.createElement("template") as HTMLTemplateElement;

    const childrenStubs = this._makeStubs();

    let templateString = this.render();
    if (this.htmlWrapped) {
      const htmlWrapper = this.props.htmlWrapper as TComponentWrapper;
      templateString = Handlebars.compile(htmlWrapper.htmlWrapperTemplate)({
        [`${htmlWrapper.componentAlias}`]: templateString,
      });
    }

    const context = {
      ...this.props,
      ...this.state,
      ...childrenStubs,
      wrappedId: this.wrappedId,
    };

    const htmlString = Handlebars.compile(templateString)(context);

    fragment.innerHTML = htmlString;

    this._replaceStubs(fragment);

    return fragment.content;
  }

  public getChildByPath<TChild = TComponentChild>(
    pathString: string = ""
  ): TChild {
    return getDescendantByPath<TChild>(this.children, pathString);
  }

  private _init() {
    this.eventBus.emit(BlockCommonEvents.FLOW_RENDER);
    this.wasRendered = true;
  }

  protected _makeProxy(object: Record<string, any>) {
    const self = this;

    return new Proxy(object, {
      set(target, prop: string, value) {
        const oldValue = target[prop];
        target[prop] = value;

        self.eventBus.emit(BlockCommonEvents.FLOW_CDU, oldValue, value);

        return true;
      },
    });
  }

  private _makeStubs(): Record<string, string | string[]> {
    const stubs: Record<string, string> = {};
    Object.entries(this.children).forEach(([name, child]) => {
      if (Array.isArray(child)) {
        stubs[name] = child
          .map((ch) => `<div data-id="${ch.id}"></div>`)
          .join("");
      } else {
        stubs[name] = `<div data-id="${child.id}"></div>`;
      }
    });

    return stubs;
  }

  private _registerEvents() {
    const { eventBus } = this;
    eventBus.on(BlockCommonEvents.INIT, this._init.bind(this));
    eventBus.on(
      BlockCommonEvents.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    eventBus.on(BlockCommonEvents.FLOW_RENDER, this._render.bind(this));
  }

  private _render(): void {
    const fragment = this._compile();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.wasRendered) {
      this._removeEventsFromElement();
      this._element!.replaceWith(newElement);
    }

    this._element = newElement;
    this._setUnwrappedElement();
    this._setHtmlProperties();
    this._addEventListenersToElement();
  }

  private _replaceStub(
    fragment: HTMLTemplateElement,
    stubID: string,
    element: HTMLElement
  ) {
    const stub = fragment.content.querySelector(`[data-id="${stubID}"]`);

    if (!stub) {
      throw new Error(
        `${this.componentName}: No stub with id "${stubID}" to replace with element ${element}`
      );
    }
    stub.replaceWith(element);
  }

  private _replaceStubs(fragment: HTMLTemplateElement) {
    Object.keys(this.children).forEach((key) => {
      const child = this.children[key];
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const childElement = ch.getElement();
          if (!childElement) {
            throw new Error(
              `${this.componentName}: replacing stub with id ${
                ch.id
              } to wrong element ${childElement} of type ${typeof childElement}`
            );
          }

          this._replaceStub(fragment, ch.id, childElement);
        });
      } else {
        const childElement = child.getElement();
        if (!childElement) {
          throw new Error(
            `${this.componentName}: replacing stub with id ${
              child.id
            } to wrong element ${childElement} of type ${typeof childElement}`
          );
        }

        this._replaceStub(fragment, child.id, childElement);
      }
    });
  }

  private _setHtmlAttributes() {
    Object.entries(this.props.htmlAttributes!).forEach(([attrName, value]) => {
      this._unwrappedElement!.setAttribute(attrName, value);
    });
  }

  private _setElementStyle() {
    Object.entries(this.props.htmlStyle!).forEach(([styleProp, value]) => {
      let propValue = value;
      if (styleProp === "background-image") {
        propValue = `url(${value})`;
      }

      this._unwrappedElement!.style.setProperty(styleProp, propValue);
    });
  }

  private _setHtmlProperties() {
    this._setHtmlClasses();
    this._setHtmlAttributes();
    this._setElementStyle();
    this._unwrappedElement!.removeAttribute("wrapped-id");
  }

  private _setHtmlClasses() {
    if (this.props.htmlClasses!.length) {
      this._unwrappedElement!.classList.add(...this.props.htmlClasses!);
    }
  }

  private _setUnwrappedElement() {
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
}

export type BlockClass = typeof Block;
