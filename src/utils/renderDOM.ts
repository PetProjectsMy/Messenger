import Block from "../components/core/block";

export default function renderDOM(rootSelector: string, component: Block) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error("Root not found");
  }

  const element = component.getContent();

  if (!(element instanceof HTMLElement)) {
    throw new Error(`Wrong type ${typeof element} of element ${element}`);
  }

  if (component) root.innerHTML = "";
  root.append(element);
}
