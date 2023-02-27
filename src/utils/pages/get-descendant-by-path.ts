import { type Block } from "core/dom";

export function getDescendantByPath<
  TDescendant = ComponentTypings.Child | ComponentTypings.ChildArray
>(block: Block, pathString: string): TDescendant {
  let child: ComponentTypings.Child | ComponentTypings.ChildArray = block;
  let { children } = block;

  for (const childName of pathString.split(".")) {
    if (!children[childName]) {
      break;
    }
    child = children[childName] as ComponentTypings.Child;
    children = child.children;
  }
  return child as TDescendant;
}
