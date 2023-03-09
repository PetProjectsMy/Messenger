export function isObject(object: unknown): object is Indexed {
  return object != null && object.constructor.name === "Object";
}

export function isNullish(object: unknown): object is null | undefined {
  return object === null || object === undefined;
}
