import { type Block } from "core/dom";

export function getDescendantByPath<
  TDescendant extends TComponentChild = Block
>(block: Block, pathArray: string[]): TDescendant {
  const pathString = `children.${pathArray.join(".children.")}`;
  const path = pathString.split(".");
  let result = block as any;

  for (let i = 0; i < path.length; i++) {
    if (!result[path[i]]) {
      break;
    }

    result = result[path[i]];
  }
  return result as TDescendant;
}
