import { Indexed, deepMerge as merge } from "./objects-merge";
import { deepEqual } from "./objects-compare";
import { isObject } from "./is-object";

export function setPropByPath(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (!isObject(object)) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
}

export function comparePropByPath(
  object: Indexed | unknown,
  pathString: string,
  valueToCompare: unknown
): Indexed | unknown {
  if (!isObject(object)) {
    throw new Error(
      `Incorrect target ${object} of type ${typeof object} to compare prop by path`
    );
  }
  if (!(typeof pathString === "string" && pathString.length)) {
    throw new Error("path must be not empty string");
  }

  const path = pathString.split(".");
  let value = object as any;
  for (let i = 0; i < path.length; i++) {
    if (!isObject(value) || !Object.hasOwn(value, path[i])) {
      return false;
    }

    value = value[path[i]];
  }

  return deepEqual(value, valueToCompare);
}
