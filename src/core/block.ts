import Handlebars from "handlebars";
import { nanoid } from "nanoid";
import BlockBase from "./block-base";

export default class Block extends BlockBase {
  private wasRendered: Boolean = false;

  protected state: ComponentState;

  protected children: ComponentChildren;

  public refs: ComponentRefs;

  private htmlWrapper: Nullable<ComponentWrapper>;

  private htmlWrapped: boolean;

  private wrappedId: string = nanoid(5);

  constructor({
    props = {},
    children = {},
    refs = {},
    state = {},
  }: {
    props?: ComponentProps;
    children?: ComponentChildren;
    refs?: ComponentRefs;
    state?: ComponentState;
  } = {}) {
    super();

    this.props = props;
    this.props.events = this.props.events ?? {};

    this.children = children;
    this.refs = refs;
    this.state = state;

    this.htmlWrapper = props.htmlWrapper as ComponentWrapper;
    this.htmlWrapped = !!this.htmlWrapper;
    delete this.props.htmlWrapper;

    this.componentName = (props.componentName ?? "Not Named Block") as string;

    this._preProxyHook();
    this.props = this._makePropsProxy(this.props);

    this._registerEvents();
    this._preInitHook();
    this.eventBus.emit(Block.EVENTS.INIT);
    this._postInitHook();
  }

  private _init() {
    this.eventBus.emit(BlockBase.EVENTS.FLOW_RENDER);
    this.wasRendered = true;
  }

  protected _makePropsProxy(props: ComponentProps) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return value;
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

  private _assertChildrenArray(children: unknown[]) {
    children.forEach((child) => {
      if (!(child instanceof Block)) {
        throw new Error(
          `${
            this.componentName
          }, making stubs: children array wrong element ${child} of type ${typeof child}`
        );
      }
    });
  }

  private _registerEvents() {
    const { eventBus } = this;
    eventBus.on(BlockBase.EVENTS.INIT, this._init.bind(this));
    eventBus.on(BlockBase.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BlockBase.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BlockBase.EVENTS.FLOW_RENDER, this._render.bind(this));
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
        this._assertChildrenArray(child);

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

  private _render(): void {
    if (!Block.isHTMLElement(this._element)) {
      if (!(this._element === null && !this.wasRendered)) {
        throw new Error(
          `${this.componentName}: wrong element ${
            this._element
          } of type ${typeof this._element} to first render`
        );
      } else if (this.wasRendered) {
        throw new Error(
          `${this.componentName}: wrong element ${
            this._element
          } of type ${typeof this._element} to rerender`
        );
      }
    }

    const fragment = this._compile();
    const newElement = fragment.firstElementChild as HTMLElement;

    let eventsTargerElement = newElement;

    if (this.htmlWrapped) {
      const wrappedElement = newElement.querySelector(
        `[wrapped-id="${this.wrappedId}"]`
      ) as HTMLElement;

      if (!wrappedElement) {
        throw new Error(
          `${this.componentName}: whereas htmlWrapper provided, no wrapped element created`
        );
      }

      eventsTargerElement = wrappedElement;
    }

    this._addEvents(eventsTargerElement);
    eventsTargerElement.removeAttribute("wrapped-id");

    if (this.wasRendered) {
      this._element!.replaceWith(newElement);
    }

    this._element = newElement;
  }

  private _compile(): DocumentFragment {
    const fragment = Block._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    const childrenStubs = this._makeStubs();

    let templateString = this.render();
    if (this.htmlWrapped) {
      const htmlWrapper = this.htmlWrapper as ComponentWrapper;
      templateString = Handlebars.compile(htmlWrapper.htmlWrapperTemplate)({
        [`${htmlWrapper.componentAlias}`]: templateString,
      });
    }

    const context = {
      ...this.props,
      ...this.state,
      ...childrenStubs,
      wrappedId: this.htmlWrapped ? this.wrappedId : null,
    };

    const htmlString = Handlebars.compile(templateString)(context);

    fragment.innerHTML = htmlString;

    this._replaceStubs(fragment);

    return fragment.content;
  }

  protected render(): string {
    return "";
  }

  getComponentName() {
    return this.componentName;
  }

  protected _preProxyHook() {
    this._bindEventListeners();
  }

  protected _preInitHook() {}

  protected _postInitHook() {}
}
