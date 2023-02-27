import { type Block } from "core/dom";

export function getDescendantByPath<
  TDescendant = TComponentChild | TComponentChildArray
>(block: Block, pathString: string): TDescendant {
  let child: TComponentChild | TComponentChildArray = block;
  let { children } = block;

  for (const childName of pathString.split(".")) {
    if (!children[childName]) {
      break;
    }
    child = children[childName] as TComponentChild;
    children = child.children;
  }
  return child as TDescendant;
}
