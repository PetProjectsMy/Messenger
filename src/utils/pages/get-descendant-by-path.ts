import { type Block } from "core/dom";

export function getDescendantByPath(block: Block, pathArray: string[]) {
  const path = `children.${pathArray.join(".children.")}`.split(".");
  let pathExisting = path;
  let result = block as any;

  for (let i = 0; i < path.length; i++) {
    if (!result[path[i]]) {
      pathExisting = path.slice(0, i).join(".");
      break;
    }

    result = result[path[i]];
  }
  console.log(`PATH '${path.join(".")}' EXISTING PART: ${pathExisting}}`);
  return result;
}
