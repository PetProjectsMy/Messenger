import { isNullish } from "utils/objects-handle";

export function toggleHtmlClassToList(
  classesList: string[],
  className: string,
  state: Nullable<"on" | "off">
) {
  if (isNullish(state)) {
    if (classesList.includes(className)) {
      classesList = classesList.filter((item) => item !== className);
    } else {
      classesList = [...classesList, className];
    }
    return classesList;
  }

  const classesSet = new Set(classesList);
  if (state === "on" && !classesSet.has(className)) {
    classesList = [...classesList, className];
  } else if (state === "off" && classesSet.has(className)) {
    classesList = classesList.filter((item) => item !== className);
  }

  return classesList;
}
