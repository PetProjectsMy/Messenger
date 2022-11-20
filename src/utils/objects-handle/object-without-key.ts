export function objectWithoutKey(object: Record<string, unknown>, key: string) {
  // eslint-disable-next-line no-unused-vars
  const { [key]: deletedValue, ...otherKeys } = object;
  return otherKeys;
}
