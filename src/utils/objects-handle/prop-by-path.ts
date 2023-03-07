import { isObject } from "./is-object";
import { deepEqual } from "./objects-compare";
import { deepMerge as merge } from "./objects-merge";

type TPropActionArgs = {
  object: object;
  pathString: string;
  value: unknown;
  isLogNeeded?: boolean;
};
export function setPropByPath({
  object,
  pathString,
  value,
  isLogNeeded = false,
}: TPropActionArgs) {
  if (!isObject(object)) {
    return object;
  }
  const path = pathString.split(".");
  const result = path.reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  if (isLogNeeded) {
    console.log(
      `SET PROP BY PATH '${pathString}': value ${JSON.stringify(value)}`
    );
  }
  return merge(object as Indexed, result);
}

export function comparePropByPath({
  object,
  pathString,
  value,
  isLogNeeded = false,
}: TPropActionArgs): boolean {
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
  let currentValue = object as any;

  for (let i = 0; i < path.length; i++) {
    if (!isObject(currentValue) || !Object.hasOwn(currentValue, path[i])) {
      pathExisting = path.slice(0, i);
      break;
    }

    currentValue = currentValue[path[i]];
  }

  if (isLogNeeded) {
    console.log(
      `PATH COMPARE'${pathString}' EXISTING PART: ` +
        `${pathExisting.join(".")}\n` +
        `CURRENT VALUE ${JSON.stringify(
          currentValue
        )}, TO COMPARE ${JSON.stringify(value)}`
    );
  }

  return pathExisting.length < path.length
    ? false
    : deepEqual(currentValue, value);
}

export function getPropByPath({
  object,
  pathString,
  isLogNeeded = false,
}: Omit<TPropActionArgs, "value">): any {
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

  if (isLogNeeded) {
    console.log(
      `PATH GET '${pathString}' EXISTING PART: ` +
        `${pathExisting.join(".")}\n` +
        `value: ${JSON.stringify(value)}`
    );
  }

  return isObject(value) ? merge({}, value) : value;
}
