import Block from "./block";

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

class MainPageSingleton {
  static instance: Nullable<MainPageSingleton> = null;

  public page: { component: Nullable<Block> };

  constructor() {
    this.page = { component: null };
  }

  public static getInstance() {
    if (!MainPageSingleton.instance) {
      MainPageSingleton.instance = new MainPageSingleton();
    }

    return MainPageSingleton.instance;
  }
}

export const MainPage: PageProxy = new Proxy(
  (MainPageSingleton.getInstance() as MainPageSingleton).page,
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
