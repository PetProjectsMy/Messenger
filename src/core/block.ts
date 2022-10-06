import Handlebars from "handlebars";
import BlockBase from "./block-base";

export default class Block extends BlockBase {
  protected children: ComponentChildren;

  constructor(propsAndChildren: ComponentPropsAndChildren = {}) {
    super();

    const { props, children } = Block._getPropsAndChildren(propsAndChildren);
    this.children = children;
    this.props = this._makePropsProxy(props);

    this.componentName = props.name ?? "Not Named Block";

    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _init() {
    this.eventBus.emit(BlockBase.EVENTS.FLOW_RENDER);
    this.wasRendered = true;
  }

  private _registerEvents() {
    const { eventBus } = this;
    eventBus.on(BlockBase.EVENTS.INIT, this._init.bind(this));
    eventBus.on(BlockBase.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BlockBase.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BlockBase.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private static _getPropsAndChildren(
    propsAndChildren: ComponentPropsAndChildren
  ): {
    props: ComponentProps;
    children: ComponentChildren;
  } {
    const children: ComponentChildren = {};
    const props: ComponentProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        Block._assertChildrenArray(value);
        children[key] = value;
      } else {
        props[key] = value as ComponentPropsBase;
      }
    });

    return { children, props };
  }

  private static _assertChildrenArray(arr: unknown[]) {
    if (arr.every((el) => el instanceof Block)) {
      return;
    }

    throw new Error(`Children array must only consist of Block elemnets!`);
  }

  private _makeStubs(): Record<string, string | string[]> {
    const stubs = {};
    Object.entries(this.children).forEach(([name, child]) => {
      if (Array.isArray(child)) {
        Block._assertChildrenArray(child);
        stubs[name] = child
          .map((ch) => `<div data-id="${ch.id}"></div>`)
          .join("");
      } else {
        stubs[name] = `<div data-id="${child.id}"></div>`;
      }
    });

    console.log(stubs);
    return stubs;
  }

  private static _replaceStub(
    fragment: HTMLTemplateElement,
    stubID: string,
    element: HTMLElement
  ) {
    const stub = fragment.content.querySelector(`[data-id="${stubID}"]`);
    stub.replaceWith(element);
  }

  private _replaceStubs(fragment: HTMLTemplateElement) {
    Object.keys(this.children).forEach((key) => {
      const child = this.children[key];
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          Block._replaceStub(fragment, ch.id, ch.getElement());
        });
      } else {
        Block._replaceStub(fragment, child.id, child.getElement());
      }
    });
  }

  private _render(): void {
    const element = this._element;

    if (!Block.isHTMLElement(element)) {
      if (!(element === null && !this.wasRendered)) {
        throw new Error(
          `Wrong element ${element} of type ${typeof element} to render`
        );
      }
    }

    const fragment = this._compile();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.wasRendered) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this._addEvents();
  }

  private _compile(): DocumentFragment {
    const fragment = Block._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    const templateString = this.render();
    const stubs = this._makeStubs();
    const context = { ...this.props, ...stubs };
    const htmlString = Handlebars.compile(templateString)(context);
    console.log(htmlString);
    fragment.innerHTML = htmlString;
    this._replaceStubs(fragment);

    return fragment.content;
  }

  protected render(): string {
    return "";
  }
}
