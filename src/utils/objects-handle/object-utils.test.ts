import { deepMerge } from "./objects-merge";

describe("Test Deep Merge", () => {
  test("merge flat objects", () => {
    const obj1 = { num: 1, bool: false };
    const obj2 = { num: 2, bool: true };

    const result = deepMerge(obj1, obj2);

    expect(result).not.toBe(obj2);
    expect(result).toEqual(obj2);
  });
});
