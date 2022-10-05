"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const event_bus_1 = __importDefault(require("./event-bus"));
const object_compare_1 = __importDefault(require("../../utils/object-compare"));
function isHTMLElement(element) {
    return element instanceof HTMLElement;
}
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };
    _element = null;
    eventBus;
    props;
    children;
    wasRendered = false;
    id = "";
    constructor(propsAndChildren = {}) {
        const { props, children } = Block._getPropsAndChildren(propsAndChildren);
        this.children = children;
        this.props = this._makePropsProxy(props);
        this.id = `id-${(0, nanoid_1.nanoid)(10)}`;
        const eventBus = event_bus_1.default.getInstance();
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    static _getPropsAndChildren(propsAndChildren) {
        const children = {};
        const props = {};
        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            }
            else if (Array.isArray(value) &&
                value.every((v) => v instanceof Block)) {
                children[key] = value;
            }
            else {
                props[key] = value;
            }
        });
        return { children, props };
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.wasRendered = true;
    }
    _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((ch) => ch.dispatchComponentDidMount());
            }
            else {
                child.dispatchComponentDidMount();
            }
        });
    }
    componentDidMount() { }
    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        console.log("Did update");
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this._addEvents();
    }
    componentDidUpdate(oldProps, newProps) {
        return !(0, object_compare_1.default)(oldProps, newProps);
    }
    setProps(nextProps) {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    }
    get element() {
        return this._element;
    }
    compile(template, context) {
        const fragment = Block._createDocumentElement("template");
        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                context[key] = child.map((ch) => `<div data-id="${ch.id}"></div>`);
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
                throw new Error(`Wrong element ${element} with type ${typeof element} to replace stub`);
            }
            console.log(`replace ${stub} with ${element}`);
            stub.replaceWith(element);
        });
        return fragment.content;
    }
    _render() {
        // const element = this._element;
        // if (!isHTMLElement(element)) {
        //   if (!(element === null && !this.wasRendered)) {
        //     throw new Error(
        //       `Wrong element ${element} of type ${typeof element} to render`,
        //     );
        //   }
        // }
        const fragment = this.render();
        const newElement = fragment.firstElementChild;
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
    render() {
        return new DocumentFragment();
    }
    _addEvents() {
        const { events } = this.props;
        const element = this._element;
        if (!isHTMLElement(element)) {
            throw new Error(`Wrong element ${element} of type ${typeof element} to add event listeners`);
        }
        if (!events) {
            return;
        }
        Object.entries(events).forEach(([event, listener]) => {
            element.addEventListener(event, listener);
            console.log(`add event ${event} to ${element}`);
        });
    }
    _removeEvents() {
        const { events } = this.props;
        const element = this._element;
        if (!isHTMLElement(element)) {
            throw new Error(`Wrong element ${element} of type ${typeof element} to remove event listeners`);
        }
        if (!events) {
            return;
        }
        Object.entries(events).forEach(([event, listener]) => {
            element.removeEventListener(event, listener);
        });
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
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
    static _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        const element = this.getContent();
        if (!isHTMLElement(element)) {
            throw new Error(`Wrong element ${element} of type ${typeof element} to show`);
        }
        element.style.display = "block";
    }
    hide() {
        const element = this.getContent();
        if (!isHTMLElement(element)) {
            throw new Error(`Wrong element ${element} of type ${typeof element} to hide`);
        }
        if (!isHTMLElement(element)) {
            element.style.display = "none";
        }
    }
}
exports.default = Block;
