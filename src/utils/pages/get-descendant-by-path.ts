import { type Block } from "core/dom";

export function getDescendantByPath<
  TDescendant extends TComponentChild = Block
>(block: Block, pathArray: string[]): TDescendant {
  const pathString = `children.${pathArray.join(".children.")}`;
  const path = pathString.split(".");
  let pathExisting = pathString;
  let result = block as any;

  for (let i = 0; i < path.length; i++) {
    if (!result[path[i]]) {
      pathExisting = path.slice(0, i).join(".");
      break;
    }

    result = result[path[i]];
  }
  // console.log(`PATH '${path.join(".")}' EXISTING PART: ${pathExisting}}`);
  return result as TDescendant;
}
