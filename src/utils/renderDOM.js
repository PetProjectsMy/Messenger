"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderDOM(rootSelector, component) {
    const root = document.querySelector(rootSelector);
    if (!root) {
        throw new Error("Root not found");
    }
    const element = component.getContent();
    if (!(element instanceof HTMLElement)) {
        throw new Error(`Wrong type ${typeof element} of element ${element}`);
    }
    if (component)
        root.innerHTML = "";
    root.append(element);
}
exports.default = renderDOM;
