import { Indexed, deepMerge as merge } from "./objects-merge";
import { deepEqual } from "./objects-compare";
import { isObject } from "./is-object";

export function setPropByPath(
  object: Indexed | unknown,
  pathString: string,
  value: unknown
): Indexed | unknown {
  if (!isObject(object)) {
    return object;
  }

  if (typeof pathString !== "string") {
    throw new Error("path must be string");
  }

  const path = pathString.split(".");
  if (path.length === 1 && path[0] === "") {
    return value;
  }

  const result = path.reduceRight<Indexed>(
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
  valueToCompare: unknown,
  doLog: boolean = false
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
  let pathExisting = path;
  let value = object as any;

  for (let i = 0; i < path.length; i++) {
    if (!isObject(value) || !Object.hasOwn(value, path[i])) {
      pathExisting = path.slice(0, i);
      break;
    }

    value = value[path[i]];
  }

  if (doLog) {
    console.log(
      `PATH '${pathString}' EXISTING PART: ` +
        `${pathExisting.join(".")}, ` +
        `value: ${value}, ${JSON.stringify(value)}`
    );
  }

  return pathExisting.length < path.length
    ? false
    : deepEqual(value, valueToCompare);
}

export function getPropByPath(
  object: Indexed | unknown,
  pathString: string,
  doLog: boolean = false
): any {
  if (!isObject(object)) {
    throw new Error(
      `Incorrect target ${object} of type ${typeof object} to get prop by path`
    );
  }
  if (!(typeof pathString === "string" && pathString.length)) {
    throw new Error("path must be not empty string");
  }

  const path = pathString.split(".");
  let pathExisting = path;
  let value = object as any;

  for (let i = 0; i < path.length; i++) {
    if (!isObject(value) || !Object.hasOwn(value, path[i])) {
      pathExisting = path.slice(0, i);
      break;
    }

    value = value[path[i]];
  }

  if (doLog) {
    console.log(
      `PATH '${pathString}' EXISTING PART: ` +
        `${pathExisting.join(".")}, ` +
        `value: ${value}, ${JSON.stringify(value)}`
    );
  }
  const result = setPropByPath({}, "", value);
  return result;
}
