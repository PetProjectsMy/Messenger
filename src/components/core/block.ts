import { nanoid } from "nanoid";
import EventBus from "./event-bus";
import propsAreEqual from "../../utils/object-compare";

type TChildren = Record<string, Block | Block[]>;
type ComponentPropsAndChildren = {
  [prop: string]: string | Function | ComponentNotEventsProps | Block | Block[];
} & ComponentEventsProp;

function isHTMLElement(element: any) {
  return element instanceof HTMLElement;
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;

  private eventBus: () => EventBus;

  protected props: ComponentProps;

  protected children: TChildren;

  private wasRendered: Boolean = false;

  public id: string = "";

  constructor(propsAndChildren: ComponentPropsAndChildren = {}) {
    const { props, children } = Block._getPropsAndChildren(propsAndChildren);
    this.children = children;

    this.props = this._makePropsProxy(props);

    this.id = `id-${nanoid(10)}`;

    const eventBus = EventBus.getInstance();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private static _getPropsAndChildren(
    propsAndChildren: ComponentPropsAndChildren
  ): {
    props: ComponentProps;
    children: TChildren;
  } {
    const children: TChildren = {};
    const props: ComponentProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        Array.isArray(value) &&
        value.every((v) => v instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key] = value as any;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.wasRendered = true;
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    console.log("Did update");
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this._addEvents();
  }

  componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): boolean {
    return !propsAreEqual(oldProps, newProps);
  }

  setProps(nextProps: ComponentProps): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  protected compile(
    template: (context: ComponentPropsAndChildren) => string,
    context: ComponentPropsAndChildren
  ): DocumentFragment {
    const fragment = Block._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map(
          (ch) => `<div data-id="${ch.id}"></div>`
        ) as any;
        return;
      }

      context[key] = `<div data-id="${child.id}"></div>`;
    });

    const htmlString = template(context);
    fragment.innerHTML = htmlString;

    Object.keys(this.children).forEach((key) => {
      const child = this.children[key];
      if (Array.isArray(child)) {
        return;
      }

      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (!stub) {
        throw new Error(`No stub with id ${child.id} found`);
      }
      const element = child.getContent();
      if (!isHTMLElement(element)) {
        throw new Error(
          `Wrong element ${element} with type ${typeof element} to replace stub`
        );
      }

      console.log(`replace ${stub} with ${element}`);
      stub.replaceWith(element!);
    });

    return fragment.content;
  }

  _render(): void {
    // const element = this._element;

    // if (!isHTMLElement(element)) {
    //   if (!(element === null && !this.wasRendered)) {
    //     throw new Error(
    //       `Wrong element ${element} of type ${typeof element} to render`,
    //     );
    //   }
    // }

    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    // if (this.wasRendered) {
    //   this._element!.replaceWith(newElement);
    // }

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _addEvents(): void {
    const { events }: ComponentEventsProp = this.props;
    const element = this._element;

    if (!isHTMLElement(element)) {
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
        console.log(`add event ${event} to ${element}`);
      }
    );
  }

  private _removeEvents(): void {
    const { events }: ComponentEventsProp = this.props;
    const element = this._element;

    if (!isHTMLElement(element)) {
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

  getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: ComponentProps) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldValue = target[prop];

        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, value);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private static _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show(): void {
    const element = this.getContent();

    if (!isHTMLElement(element)) {
      throw new Error(
        `Wrong element ${element} of type ${typeof element} to show`
      );
    }

    element!.style.display = "block";
  }

  hide(): void {
    const element = this.getContent();

    if (!isHTMLElement(element)) {
      throw new Error(
        `Wrong element ${element} of type ${typeof element} to hide`
      );
    }

    if (!isHTMLElement(element)) {
      element!.style.display = "none";
    }
  }
}
