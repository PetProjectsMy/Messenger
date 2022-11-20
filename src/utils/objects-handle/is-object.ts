export function isObject(object: any) {
  return object != null && object.constructor.name === "Object";
}

export function isNullish(object: any) {
  return object === null || object === undefined;
}
