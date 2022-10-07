import Block from "./block-base";

export function renderDOM(rootSelector: string, component: Block) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error("Root not found");
  }

  const element = component.getElement();

  if (!(element instanceof HTMLElement)) {
    throw new Error(`Wrong type ${typeof element} of element ${element}`);
  }

  if (component) root.innerHTML = "";
  root.append(element);
}

export const MainPage: PageProxy = new Proxy(
  { component: null },
  {
    set(target, prop, block: Block) {
      if (prop === "component") {
        target[prop] = block;
        renderDOM("#app", block);
      }
      return true;
    },
  }
);
