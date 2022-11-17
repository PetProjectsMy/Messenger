export function getDescendantByPath<TDescendant = TComponentChild>(
  blockChildren: TComponentChildren,
  pathString: string
): TDescendant {
  const path = pathString.split(".").join(".children.").split(".");
  let result = blockChildren as any;

  for (let i = 0; i < path.length; i++) {
    if (!result[path[i]]) {
      break;
    }

    result = result[path[i]];
  }
  return result as TDescendant;
}
