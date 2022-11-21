import { Block } from "./block";

export function renderDOM({
  rootSelector = "#app",
  component,
}: {
  rootSelector?: string;
  component: Block;
}) {
  console.log(`render ${component.componentName}`);
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
