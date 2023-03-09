import { isObject } from "./is-object";

export function deepMerge(target: Indexed, ...sources: Indexed[]): Indexed {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();
  if (source === undefined) {
    return target;
  }

  if (isMergebleObject(target) && isMergebleObject(source)) {
    Object.entries(source).forEach(function ([sourceKey, sourceValue]) {
      if (isMergebleObject(sourceValue)) {
        if (!Object.getOwnPropertyDescriptor(target, sourceKey)) {
          target[sourceKey] = {};
        }

        const targetValue = target[sourceKey];
        if (isMergebleObject(targetValue)) {
          deepMerge(targetValue, sourceValue);
        }
      } else {
        target[sourceKey] = sourceValue;
      }
    });
  }

  return deepMerge(target, ...sources);
}

const isMergebleObject = (item: unknown): item is Indexed => {
  return isObject(item) && !Array.isArray(item);
};

export function deepCopy(object: unknown) {
  if (isObject(object)) {
    return deepMerge({}, object);
  } else {
    return object;
  }
}
