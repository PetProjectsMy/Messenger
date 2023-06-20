import { isObject } from "./is-object";
import { deepEqual } from "./objects-compare";
import { deepMerge } from "./objects-merge";

type TPropActionArgs = {
  object: object;
  value: unknown;
  pathString: string;
  isLogNeeded?: boolean;
};

export function setPropByPath({
  object,
  pathString,
  value,
  isLogNeeded = false,
}: TPropActionArgs) {
  let result;
  const path = pathString.split(".");

  if (!isObject(object)) {
    result = object;
  } else {
    result = path.reduceRight<Indexed>(
      (acc, key) => ({
        [key]: acc,
      }),
      value as any
    );

    result = deepMerge(object as Indexed, result);
  }

  if (isLogNeeded) {
    console.log(
      `SET PROP BY PATH '${pathString}': value ${JSON.stringify(value)}`
    );
  }

  return result;
}

export function getPropByPath({
  object,
  pathString = "",
  isLogNeeded = false,
}: Omit<TPropActionArgs, "value">): any {
  const path = pathString.split(".");
  let pathExisting = path;
  let value = object as any;

  if (isObject(object) || pathString !== "") {
    for (let i = 0; i < path.length; i++) {
      if (!isObject(value) || !Object.hasOwn(value, path[i])) {
        pathExisting = path.slice(0, i);
        break;
      }

      value = value[path[i]];
    }
  }

  if (isLogNeeded) {
    console.log(
      `PATH GET '${pathString}' EXISTING PART: ` +
        `${pathExisting.join(".")}\n` +
        `value: ${JSON.stringify(value)}`
    );
  }

  return value;
}

export function isPropByPathEqualToValue({
  object,
  pathString,
  value,
  isLogNeeded = false,
}: TPropActionArgs): boolean {
  let result;
  const path = pathString.split(".");
  let pathExisting = path;
  let currentValue = object as any;

  if (!isObject(object)) {
    result = false;
  } else if (!(typeof pathString === "string" && pathString.length > 0)) {
    result = false;
  } else {
    for (let i = 0; i < path.length; i++) {
      if (!isObject(currentValue) || !Object.hasOwn(currentValue, path[i])) {
        pathExisting = path.slice(0, i);
        break;
      }

      currentValue = currentValue[path[i]];
    }

    result =
      pathExisting.length < path.length
        ? false
        : deepEqual(currentValue, value);
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

  return result;
}
